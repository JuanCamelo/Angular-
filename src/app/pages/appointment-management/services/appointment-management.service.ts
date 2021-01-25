import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';
import { RequestResult } from 'src/app/models/request-result';
import { catchError, map } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { AppointmentState } from '../../../models/appointment-state';
import { CollectionDTO } from 'src/app/models/Collection';
import { HistoryMedicalAppoimentDTO, HistoryMedicalAppoimentFilter } from '../history-medical-appointments/models/history-medical-appoiment';
import { ProgramateAppointmentDTO } from '../programate-appointment/models/models.programate';
import { SolicitudCitaEspera } from './models/SolicitudCitaEspera';
import { ListAppointmentDTO } from '../list-patients-schedule-appointment/models/list-patients-module';



@Injectable({
    providedIn: 'root'
})
export class AppointmentManagementService {
    private urlApi: string;
    private handleError: any;
    private resolveRR: any;

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

    GetAppointmentHistory(filters: HistoryMedicalAppoimentFilter): Observable<Array<HistoryMedicalAppoimentDTO>> {
        this.sharedService.showLoader(true)
        return this.http.post<RequestResult<Array<HistoryMedicalAppoimentDTO>>>(`${this.urlApi}Citas/GetAppointmentHistory`, filters)
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false)
                    return this.resolveRR(response)
                }),
                catchError(this.handleError)
            );
    }

    GetAppointmentPerson(idPerson: string): Observable<Array<ProgramateAppointmentDTO>> {
        this.sharedService.showLoader(true);
        return this.http.get<RequestResult<Array<ProgramateAppointmentDTO>>>(`${this.urlApi}Citas/GetAppointmentPerson?id_person=${idPerson}`)
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false);
                    return this.resolveRR(response);
                }),
                catchError(this.handleError)
            );
    }

    GetAllappointmentStatus(): Observable<Array<AppointmentState>> {
        this.sharedService.showLoader(true);
        return this.http.get<RequestResult<Array<AppointmentState>>>(`${this.urlApi}Citas/GetAllappointmentStatus`)
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false);
                    return this.resolveRR(response);
                }),
                catchError(this.handleError)
            )
    }

    GetHeadquarters(): Observable<Array<CollectionDTO>> {
        this.sharedService.showLoader(true);
        return this.http.get<RequestResult<Array<CollectionDTO>>>(`${this.urlApi}Generics/GetHeadquarters`)
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false);
                    return this.resolveRR(response);
                }),
                catchError(this.handleError)
            );
    }

    GetReasonCancellationAppointment(): Observable<Array<CollectionDTO>> {
        this.sharedService.showLoader(true);
        return this.http.get<RequestResult<Array<CollectionDTO>>>(`${this.urlApi}Citas/GetReasonCancellationAppointment`)
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false);
                    return this.resolveRR(response);
                }),
                catchError(this.handleError)
            );
    }

    GetWaitinList(formDataDatesRequest?: ListAppointmentDTO): Observable<any> {
        let params = new HttpParams();

        if(formDataDatesRequest){
            params = new HttpParams({ 
                fromObject: { tipoIdentificacion: formDataDatesRequest.idTipoDocumento, 
                              numeroDocumento: formDataDatesRequest.numeroDocumento,
                              contrato: formDataDatesRequest.contrato,
                              tipoCita: formDataDatesRequest.idTipoCita,
                              especialidad: formDataDatesRequest.idTipoEspecialidad,
                              procedimiento: formDataDatesRequest.idTipoProcedimiento,
                              fechaAsignacion: formDataDatesRequest.fechaAsignacion ? formDataDatesRequest.fechaAsignacion.toISOString(): "",
                              fechaDeseada: formDataDatesRequest.fechaDeseada ? formDataDatesRequest.fechaDeseada.toISOString(): "",
                            } 
            });
        }

        this.sharedService.showLoader(true);
        return this.http.get<RequestResult<any>>(`${this.urlApi}CitaListaEspera/GetWaitinList`, {params})
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false);
                    return this.resolveRR(response);
                }),
                catchError(this.handleError)
            );
    }

    UpdateCancelScheduledAppointment(idCitaPersona: string, idMotivoCancelcion: string): Observable<any> {
        const params = new HttpParams({ fromObject: { idCitaPersona, idMotivoCancelcion } });
        this.sharedService.showLoader(true);
        return this.http.post<RequestResult<any>>(`${this.urlApi}Citas/UpdateCancelScheduledAppointment?idCitaPersona=${idCitaPersona}&idMotivoCancelcion=${idMotivoCancelcion}`, params)
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false)
                    return this.resolveRR(response)
                }),
                catchError(this.handleError)
            );
    }

    SaveRequestWaitingList(solicitud: SolicitudCitaEspera): Observable<boolean> {
        this.sharedService.showLoader(true);
        return this.http.post<RequestResult<boolean>>(`${this.urlApi}CitaListaEspera/SaveRequestWaitingList`, solicitud)
            .pipe(
                map((response) => {
                    this.sharedService.showLoader(false)
                    return this.resolveRR(response)
                }),
                catchError(this.handleError)
            );
    }
}