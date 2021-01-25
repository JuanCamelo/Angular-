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
export class PhysicalExamService {

  private urlApi: string;
  idRegistroMedico: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sesionService: SessionService,
    private sharedService: SharedService,
    private resolveRequestResultService: ResolveRequestResultService,
    private store: Store<AppState>
  ) {
    this.handleError = this.handleError.bind(this)
    this.urlApi = this.configService.config.urlApi;
    this.store.select(state => state.clinicalSummary?.idRegistroMedico).pipe(filter(idRegistroMedico => !!idRegistroMedico))
      .subscribe(idRegistroMedico => {
        this.idRegistroMedico = idRegistroMedico
      });
  }

  getExamPhysical() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any[]>>(`${this.urlApi}ExamenFisico/GetExamPhysical`).pipe(retry(0), catchError(this.handleError), map((response) => {
      this.sharedService.showLoader(false)
      return this.resolveRequestResultService.resolve(response);
    }));
  }

  saveExamPhysical(physicalExam: ItemSaveInfo[]) {

    const registroMedicoDTO: RegistroMedicoDTO = {
      physicalExam,
      idRegistromedico: this.idRegistroMedico
    }

    this.sharedService.showLoader(true)
    /* return this.http.post<RequestResult<any[]>>(`${this.urlApi}ExamenFisico/SaveExamPhysical`, registroMedicoDTO).pipe(retry(0), catchError(this.handleError), map((response) => { */
    return this.http.post<RequestResult<any[]>>(`${this.urlApi}ExamenFisico/SaveExamPhysical_V2`, registroMedicoDTO).pipe(retry(0), catchError(this.handleError), map((response) => {
      /* this.sharedService.showLoader(false) */
      return this.resolveRequestResultService.resolve(response);
    }));
  }

  private handleError(error) {
    this.sharedService.showLoader(false)
    console.error(error);
    this.sharedService.error(error)
    return throwError(error);
  }
}
