import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';
import { RequestResult } from 'src/app/models/request-result';
import { retry, catchError, map, switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';
import { Observable, of } from 'rxjs';
import { InfoPatientDTO } from '../models/InfoPatientDTO';
import { AppointmentTypeDTO, HeadquarteresDTO } from '../models/appointmentDTO';
import { Collection } from '../models/Collection';
import { SessionService } from 'src/app/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class GenericsService {
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
    private sessionService: SessionService,
  ) {
    this.urlApi = configService.config.urlApi;
    this.handleError = this.resolveRequestResultService.handleError
    this.resolveRR = this.resolveRequestResultService.resolve
  }

  GetInfoPatient(documentType: string, documentNumber: string) {
    const params = new HttpParams({ fromObject: { documentType, documentNumber } });

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<InfoPatientDTO>>(`${this.urlApi}Generics/GetInfoPatient`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return response;
      }));
  }

  GetAllAppoitmentType() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<AppointmentTypeDTO>>(`${this.urlApi}Generics/GetAppoitmentType`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return response;
      }));
  }

  GetMedicalSpeciality() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<Array<AppointmentTypeDTO>>>(`${this.urlApi}EspecialidadMedica/GetMedicalSpeciality`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return response;
      }));
  }

  GetAllMedicalProcedures() {
    return this.http.get<RequestResult<AppointmentTypeDTO[]>>
      (`${this.urlApi}Generics/GetAllMedicalProceduresDescription`).pipe(map((response) => {
        return this.resolveRequestResultService.resolve(response);
      }));
  }

  GetMedicalProceduresInterconsulting(idSpecialty:string, juntaMedica: boolean = false){
    const esJuntaMedica = String(juntaMedica);
    const params = new HttpParams({ fromObject: {idSpecialty, esJuntaMedica}});
    return this.http.get<RequestResult<AppointmentTypeDTO[]>>
      (`${this.urlApi}Citas/GetProceduresInterconsulting`,{ params }).pipe(map((response) => {
        return this.resolveRequestResultService.resolve(response);
      }));
  }

  GetAllContractsDescription() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<AppointmentTypeDTO>>(`${this.urlApi}Contract/GetAllContractsDescription`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return response;
      }));
  }

  GetProfessionalsPerSpecialty(Specialty: string) {
    const params = new HttpParams({ fromObject: { Specialty } });

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Generics/GetListProfessionalPerSpecialty`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false);
        return response;
      }));
  }

  GetProfessionalsWithAvaliableShedule(specialityId: string, appointmentTypeId: string, processId: string,  activityId:string, campusId: string){
    const params = new HttpParams({ fromObject: {
      specialityId,
      appointmentTypeId,
      processId,
      activityId,
      ...((campusId !== undefined || campusId === '') && {campusId})
     } });
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Citas/GetProfessionalsWithAvaliableShedule`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return response
      }));
  }

  GetReasonCancellationWaitAppointment() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Citas/GetReasonCancellationWaitAppointment`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }

  UpdateCancelScheduledWaitAppointment(id_cita: string, id_motivo: string) {
    const params = new HttpParams({ fromObject: { id_cita, id_motivo } });

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Citas/UpdateCancelScheduledWaitAppointment`, {params})
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }

  GetHeadquarters() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<HeadquarteresDTO>>(`${this.urlApi}Generics/GetHeadquarters`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return response;
      }));
  }

  GetMedicalProcedureByDescription(filter: string): Observable<Array<Collection>> {
    return of(filter).pipe(
      switchMap(filt =>
        this.http.get<RequestResult<Array<Collection>>>(`${this.urlApi}Generics/GetMedicalProcedureByDescription?filter=${filter}`)
          .pipe(
            map((response) => {
              return this.resolveRR(response);
            }),
            catchError(this.handleError)
          ))
    );
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
      });
    }

  openTemplate(documentNumber: string) {
    this.sharedService.showLoader(true)

    const session = this.sessionService.session

    const queryParams = `?token=${session ? session.token : 'nullToken'}&Numerodedocumento=${documentNumber}${this.configService.config.apoloParams}`;
    const urlApolo = this.configService.config.urlApolo + queryParams

    
    // redireccionar a la ruta (Emitir evento)
    const dataEmit = { id: this.generateUuid(), title: 'Crear Persona', icon: 'fas fa-file-medical', url: urlApolo }

    window.parent.postMessage({ eventName: 'newTab', data: dataEmit }, '*');

    setTimeout(() => {
      this.sharedService.showLoader(false)
    }, 1500);
  }

  GetAllTypeDocuments(isPerson: boolean = true) {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}TipoDocumento/GetTypeDocumentVaidatePerson?isPerson=${isPerson}`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }
}