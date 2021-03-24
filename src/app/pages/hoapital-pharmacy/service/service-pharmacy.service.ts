import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { RequestResult } from 'src/app/models/request-result';
import { ConfigService } from 'src/app/services/config.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResolveRequestResultService } from 'src/app/utils/resolve-requestResult';

export class datospaciente {
  sucursal: string;
  piso: string;
  cama: string;
  servicio: string;
  tdocumento: string;
  noDocumento: number;
  paciente: string;
  edad: string;
  diagnostico: string;
  prevension: string;
  plan: string;
  hospitalaria: string;
}
export class StatusM {
  color: string;
  descripcion: string;
}
export class Medicamentos {
  id: number;
  descripcion: string;
  items: { descripcion: string }[]
}




let medicamentos =
  [
    {
      id: 1, descripcion: "INDICACION 307",
      items: [
        { descripcion: "Diclofenalco 100gr" },
        { descripcion: "Paracetamol 400gr" },
        { descripcion: "Ibuprofeno 800gr" },
      ]
    }

  ]

let statusM =
  [
    { color: "red", descripcion: "Estupefaciente" },
    { color: "#DED8DE", descripcion: "Psicotrópico" },
    { color: "#E065E8", descripcion: "Antibiotico" }
  ]

let Datospaciente = [
  {
    sucursal: "Indilsa Chile",
    piso: "2",
    cama: "205",
    servicio: "Urgencias",
    tdocumento: "CC",
    noDocumento: 2132545,
    paciente: "Pedro Osorio",
    edad: "35 años",
    diagnostico: "Abdomen agudo",
    prevension: "Plan medico",
    plan: "Pleno 81",
    hospitalaria: "Hospitalaria"
  }
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
  }

  //getlist de pruebas 
  _getPatiente(): datospaciente[] {
    return Datospaciente;
  }
  _getMedicamentos(): StatusM[] {
    return statusM;
  }
  _getRMedicamento(): Medicamentos[] {
    return medicamentos;
  }
}
