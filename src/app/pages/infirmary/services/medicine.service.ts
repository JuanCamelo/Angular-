import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { RequestResult } from 'src/app/models/request-result';
import { ConfigService } from 'src/app/services/config.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';
import { MedicalAdministrationDTO } from '../models/MedicalAdministrationDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private urlApi: string;
  private handleError: any;
  private resolveRR: any;

  constructor(private sharedService: SharedService,
              private http: HttpClient,
              private configService: ConfigService,
              private resolveRequestResultService: ResolveRequestResultService,
              private sessionService: SessionService) { 

                this.urlApi = this.configService.config.urlApi;
                this.handleError = this.resolveRequestResultService.handleError
                this.resolveRR = this.resolveRequestResultService.resolve

              }
  
              GetMedicalAdministration(idMedicalRecord : string) {
                const params = new HttpParams({ fromObject: { idMedicalRecord } });
                this.sharedService.showLoader(true)
                return this.http.get<RequestResult<Array<any>>>(`${this.urlApi}MedicalOrder/GetMedicalAdministration`, {params})
                  .pipe(retry(0), catchError(this.handleError), map((response) => {
                    this.sharedService.showLoader(false)
                    return this.resolveRR(response);
                  }));
                }

                SaveMedicalAdministration(medicalAdministrationDTO: MedicalAdministrationDTO) {
                  this.sharedService.showLoader(true)
                  return this.http.post<RequestResult<any>>(`${this.urlApi}MedicalOrder/SaveMedicalAdministration`, medicalAdministrationDTO).pipe(retry(0), catchError(this.handleError), map((response) => {
                      this.sharedService.showLoader(false)
                      return this.resolveRR(response);
                    }));
                  
                  }

                  GetPresentacionSuministro() {
                    this.sharedService.showLoader(true)
                    return this.http.get<RequestResult<Array<any>>>(`${this.urlApi}MedicalOrder/GetPresentacionSuministro`)
                      .pipe(retry(0), catchError(this.handleError), map((response) => {
                        this.sharedService.showLoader(false)
                        return this.resolveRR(response);
                      }));
                  }

    /*          
  medicine: Medicine[] = [{
    id: 1,
    ordenMedica: 100,
    estado: 'Nuevo',
    fechaFormula: new Date(Date.now()),
    medicamento: 'Asetaminofen',
    concentracion: '40 miligramos',
    dosis: '40 mg',
    viaAplicacion: 'Endovenosa',
    fRhora: '6 horas',
    cantidad: 1000,
    observacion: 'Diluir en 10 cc de solucion salina 0.3%',
    fechaAplicacion: new Date(Date.now()),
  },
  {
    id: 2,
    ordenMedica: 56,
    estado: 'Nuevo',
    fechaFormula: new Date(Date.now()),
    medicamento: 'Opramosol',
    concentracion: '500 mg',
    dosis: '500 mg',
    viaAplicacion: 'Oral',
    fRhora: '6 horas',
    cantidad: 1000,
    observacion: '',
    fechaAplicacion: new Date(Date.now()),
  },
  {
    id: 3,
    ordenMedica: 80,
    estado: 'Nuevo',
    fechaFormula: new Date(Date.now()),
    medicamento: 'Endorcion',
    concentracion: '6 miligramos',
    dosis: '6 mg',
    viaAplicacion: 'Endorcion',
    fRhora: '12 horas',
    cantidad: 1000,
    observacion: 'Diluir en 10 cc de solucion salina 0.3%',
    fechaAplicacion: new Date(Date.now()),
  }]

  getMedicines() {
    return this.medicine;
  }
*/
  generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
}
