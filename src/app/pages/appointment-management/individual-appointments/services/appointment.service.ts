import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
// import { SessionService } from 'src/app/services/session.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';
import { RequestResult } from 'src/app/models/request-result';
import { retry, catchError, map, filter } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { AppointmentPerIdDTO, CitaDTO, GetAppointmentIndividualtytiDTO } from '../models/appointment.models';


@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private urlApi: string;
  private numTop: string;
  private handleError: any;
  private resolveRR: any;
  private idRegistroMedico: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  }
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sharedService: SharedService,
    private resolveRequestResultService: ResolveRequestResultService,
  ) {
    this.urlApi = configService.config.urlApi;
    this.handleError = this.resolveRequestResultService.handleError
    this.resolveRR = this.resolveRequestResultService.resolve
  }

  SearchAppointments(parametros:any) {
    const params = new HttpParams({ fromObject: parametros});

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<GetAppointmentIndividualtytiDTO[]>>(`${this.urlApi}Citas/GetAppointmentAvailableByCriterion`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }


  GetAppointmentPerId(idAppointment:string){
    const params = new HttpParams({ fromObject: {idAppointment}});

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<AppointmentPerIdDTO>>(`${this.urlApi}Citas/GetAppointmentPerId`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }

  FilterProcedurePerDescription(descripcion:string){
    
    const params = new HttpParams({ fromObject: {descripcion}});
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<AppointmentPerIdDTO>>(`${this.urlApi}MedicalRecord/FilterMedicalProcedure`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }

  SaveAppointment(citaDTO:CitaDTO){
    return this.http.post<RequestResult<any>>(`${this.urlApi}Citas/SaveAppointmentIndividuallty`, citaDTO).pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
      return response;
    }));
  }

  GetWaitinListById(listaEsperaId:string, prestadorId: string){
    const params = new HttpParams({ fromObject: {listaEsperaId, prestadorId}});

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<AppointmentPerIdDTO>>(`${this.urlApi}CitaListaEspera/GetWaitinListById`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }

}