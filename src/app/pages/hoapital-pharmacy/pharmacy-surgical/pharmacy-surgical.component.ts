import { Component, OnInit, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import * as settings from "../../../../assets/helpers/global-settings.json";
import { ServicePharmacyService, Convenciones } from "../service/service-pharmacy.service"
import { ActivatedRoute } from "@angular/router";
import { SessionService } from 'src/app/services/session.service';
import { ConfigService } from 'src/app/services/config.service';



@Component({
  selector: 'oph-pharmacy-surgical',
  templateUrl: './pharmacy-surgical.component.html',
  styleUrls: ['./pharmacy-surgical.component.scss']
})
export class PharmacySurgicalComponent implements OnInit {

  public whenClicked = [false, false];
  public timeoutCounter;
  @ViewChild("selectboxSearch") filterMedicineTextBox: DxTextBoxComponent;
  public isumosList: any[];
  public formDataRequest = {
    idInsumo: ''
  };
  public medicalStatus: Convenciones[];

  public Patient = [{ pacienteDTO: "Luisa John Thomas Parra", prestadorDTO: "Indilsa Chile", tipoDocumentoDTO: "CE", edadDTO: "27", nDocumentoDTO: "101364259", diagnosticoDTO: "", contratoDTO: "" }]
  constructor(
    private route: ActivatedRoute,
    private servicePharmacy: ServicePharmacyService,
    private sessionServ: SessionService,
    private configService: ConfigService
  ) { this.medicalStatus = this.servicePharmacy._getMedicamentos(); }

  //----------------------
  //filto de isumos 
  onFilterKeyDownV2(e) {
    clearTimeout(this.timeoutCounter);
    const value = this.filterMedicineTextBox.text;
    this.timeoutCounter = setTimeout(() => {
      if (value.length >= settings.minFilterCharacters) {
        this.servicePharmacy._getListInsumos(value).subscribe(response => {
          this.isumosList = response;
        })
      }
    }, 1000);
  }

  //----------------------
  private _getListLender() {
    const params = this.route.snapshot.paramMap.get('id');
    //falta intefrar funcion que recupera los datos del paciente
    // this.servicePharmacy._getInfoPatient(params).subscribe((response: any) => {
    //   if (!response.isValid) {
    //   }
    // });
  };
  //----------------------
  onSearch(event: any) {
    if (event) event.preventDefault();
    this.timeoutCounter = setTimeout(() => {
      if (this.formDataRequest.idInsumo.length >= settings.minFilterCharacters) {
        this.servicePharmacy._getListInsumos(this.formDataRequest.idInsumo).subscribe(response => {
          this.isumosList = response;
        })
      }
    }, 1000);
  };

  //iframe
  private _imperiumUrl: string = null;
  get imperiumUrl() {
    return this._imperiumUrl;
  };
  set imperiumUrl(url) {
    this._imperiumUrl = url;
  };


  getApoloUrl() {
    this.imperiumUrl = '';
    const session = this.sessionServ.session
    if (!session) return
    const queryParams = `?token=${session ? session.token : 'nullToken'}${this.configService.config.urlApoloFarmaciaSurgical}`
    const apoloUrl = this.configService.config.urlApolo + queryParams;
    this.imperiumUrl = apoloUrl
  };


  onActionClickSutmit(e: any) { }

  //----------------------
  onSutmitSumitMedicine(e: any) { }
  ngOnInit() {
    this._getListLender();
    this.getApoloUrl();
  }
}
