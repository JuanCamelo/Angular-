import { HttpClient, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { RequestResult } from 'src/app/models/request-result';
import { ConfigService } from 'src/app/services/config.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';
import { EgresoEnfermeriaDTO } from '../models/EgresoEnfermeriaDTO';

@Injectable({
  providedIn: 'root'
})
export class EgressService {
  urlApi :string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sharedService: SharedService,   
    private resolveRequestResultService: ResolveRequestResultService
  ) {
    this.urlApi= configService.config.urlApi;
   }

  getCondicionesEgreso() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Generics/GetCondicionEgresoEnfermeria`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }
  GetOptionsDevicesRetiredEgressInfirmary() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Generics/GetOptionsDevicesRetiredEgressInfirmary`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }
  GetEgressWithInvasiveDevices() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Generics/GetEgressWithInvasiveDevices`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }
  GetEducationsCares() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Generics/GetEducationsCares`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }
  GetEducationForm(){
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Generics/GetEducationForm`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }
  GetExitMediumEgress() {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Generics/GetExitMediumEgress`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }
  GetMedicalOrdersByRecordMedical(idMedicalRecord:string) {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}MedicalOrder/GetMedicalOrdersByMedicalRecord?idMedicalRecord=${idMedicalRecord}`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }

  GetMedicinesByMedicalRecord(idMedicalRecord:string) {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}MedicalOrder/GetMedicinesByMedicalRecord?idMedicalRecord=${idMedicalRecord}`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
      }));
  }

  SaveEgress(egressDto:EgresoEnfermeriaDTO){
    this.sharedService.showLoader(true)
    return this.http.post<RequestResult<any[]>>(`${this.urlApi}EgresoEnfermeria/SaveEgress`, egressDto)
    .pipe(
      retry(0), 
        catchError(this.resolveRequestResultService.handleError), 
        map((response) => {
          this.sharedService.showLoader(false)        
        return this.resolveRequestResultService.resolve(response);
    }));
  } 

  getCareStaff(UsuarioOphelia: string) {
    const params = new HttpParams({ fromObject: { UsuarioOphelia } });
    return this.http.get<RequestResult<any>>(`${this.urlApi}MedicalRecord/GetCareStaff`, { params })
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        this.sharedService.showLoader(false)
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
