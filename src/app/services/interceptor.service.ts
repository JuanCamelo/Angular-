import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private sessionService: SessionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sess = this.sessionService.session;
    req = req.clone({ headers: req.headers.set('OPHJsonNamingStrategy', `camelcase`).set('__Language__', 'es-CO') });
    if (sess) {
      req = req.clone({ headers: req.headers.set('Authorization', `OpheliaSuite ${sess.token}`).set('__Language__', (sess.selectedLanguage || 'es-CO')) });
    }

    if (this.sessionService.session.selectedCompany)
      req = req.clone({
        headers: req.headers
          .set('Prestador', this.sessionService.session.selectedCompany.code)
      });
    if (this.sessionService.HCType)
      req = req.clone({
        headers: req.headers
          .set('HCType', this.sessionService.HCType)
      });
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 401 || error.status === 402 || error.status === 403) {
            this.sessionService.clean();
          }
        }
        return throwError(errorMessage);
      })
    );
  }
}
