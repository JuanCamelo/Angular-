import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { RequestResult } from 'src/app/models/request-result';
import { ConfigService } from 'src/app/services/config.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';

@Injectable({
  providedIn: 'root'
})
export class ParticularAppointmentsService {

  private urlApi: string;
  private handleError: any;
  private resolveRR: any;

  constructor(private sharedService: SharedService, 
              private configService: ConfigService, 
              private http: HttpClient,
              private resolveRequestResultService: ResolveRequestResultService) {
        this.urlApi = configService.config.urlApi;
        this.handleError = this.resolveRequestResultService.handleError
        this.resolveRR = this.resolveRequestResultService.resolve
  }

  GetProgramsByMedicalOrder(medicalOrderId: string, patientId: string) {
    const params = new HttpParams({ fromObject: { medicalOrderId, patientId } });

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Citas/GetProgramsByMedicalOrder`, {params})
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }

  GetPrograms() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Citas/GetProgramsByMedicalOrder`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }

  GetActivitiesByProgram(programId: string) {
    const params = new HttpParams({ fromObject: { programId } });

    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Citas/GetActivitiesByProgram`, {params})
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRR(response);
      }));
  }
}