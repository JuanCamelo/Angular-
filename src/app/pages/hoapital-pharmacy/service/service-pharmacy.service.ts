import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { RequestResult } from 'src/app/models/request-result';
import { ConfigService } from 'src/app/services/config.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';


export class Convenciones{
  color: string;
  descripcion: string;
}
let convenciones =
  [
    { color: "red", descripcion: "Estupefacientes" },
    { color: "#DED8DE", descripcion: "Psicotrópico" },
    { color: "#E065E8", descripcion: "Antibiótico" }
  ]

@Injectable({
  providedIn: 'root'
})
export class ServicePharmacyService {

  urlApi: string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sharedService: SharedService,
    private resolveRequestResultService: ResolveRequestResultService
  ) {
    this.urlApi = configService.config.urlApi;
  }

  _getInfoPatient(ordenId: string) {
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any>>(`${this.urlApi}Farmacia/getDispatchPharmacy?ordenId=${ordenId}`)
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRequestResultService.resolve(response);
      }));
  }

  _getListInsumos(descripcion : string){
    this.sharedService.showLoader(true)
    return this.http.get<RequestResult<any[]>>(`${this.urlApi}Farmacia/getListInsumosPharmacyH`, { params: { descripcion } })
      .pipe(retry(0), catchError(this.resolveRequestResultService.handleError), map((response) => {
        this.sharedService.showLoader(false)
        return this.resolveRequestResultService.resolve(response);
      }));
  };  
  
  _getMedicamentos(): Convenciones[] {
    return convenciones;
  }
  
}
