import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { RequestResult } from 'src/app/models/request-result';
import { map, retry, catchError, filter } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { SessionService } from 'src/app/services/session.service';
import { ItemSaveInfo, RegistroMedicoDTO } from 'src/app/models/ItemSaveInfoPhsysicalExam';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private urlApi: string;
  idRegistroMedico: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private resolveRequestResultService: ResolveRequestResultService,
    private store: Store<AppState>
  ) {
    this.urlApi = this.configService.config.urlApi;
    this.store.select(state => state.clinicalSummary?.idRegistroMedico).pipe(filter(idRegistroMedico => !!idRegistroMedico))
      .subscribe(idRegistroMedico => {
        this.idRegistroMedico = idRegistroMedico
      });
  }

  InsertDiagnostics(diagnosticsInDTOs: any[]) {
    const registroMedicoDTO: any = {
      RegistroMedico: this.idRegistroMedico,
      diagnosticsInDTOs
    }

    return this.http.post<RequestResult<any[]>>(`${this.urlApi}MedicalRecord/InsertDiagnostics`, registroMedicoDTO).pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
      return this.resolveRequestResultService.resolve(response);
    }));
  }


}