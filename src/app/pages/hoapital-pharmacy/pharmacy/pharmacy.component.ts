import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router"
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { PatienteDTO } from "../models/patientDTO";
import * as settings from "../../../../assets/helpers/global-settings.json";
import { ServicePharmacyService, Convenciones } from "../service/service-pharmacy.service"
import { from } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'oph-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {

  public whenClicked = [false, false];
  public existPatien = false;
  public bedSelectModalVisible = false;
  public isAddForm = false;
  public infoPatient: PatienteDTO[];
  public medicalStatus: Convenciones[];
  public ordenSuministro: any[];
  public isumosList: any[];
  public formDataRequest = {
    idInsumo: '',
    cantidad: '',
    descripcion: ''
  };
  @ViewChild("selectboxSearch") filterMedicineTextBox: DxTextBoxComponent;

  /////vefificar si estan en uso estas varuiables
  public products: any[]
  public product: any = [];
  public timeoutCounter;

  constructor
    (
      private sessionServ: SessionService,
      private route: ActivatedRoute,
      private servicePharmacy: ServicePharmacyService,
      private configService: ConfigService
    ) { this.medicalStatus = this.servicePharmacy._getMedicamentos(); };


  private _getListLender() {
    const params = this.route.snapshot.paramMap.get('orden');
    this.servicePharmacy._getInfoPatient(params).subscribe((response: any) => {
      if (!response.isValid) {
        this.infoPatient = [...response]
        this.ordenSuministro = [...response.listOrdenMedica]
      }
    });
  };

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

  //formulario de isumos adicionales 
  onAddIsumoFormSubmit(e: any) {
    e.preventDefault();
  };

  //envio de insumos 
  onSutmitSumitMedicine(e: any) {
  }
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
    const queryParams = `?token=${session ? session.token : 'nullToken'}${this.configService.config.urlApoloFarmacia}`
    const apoloUrl = this.configService.config.urlApolo + queryParams;
    this.imperiumUrl = apoloUrl
  }

  onActionClickSutmit(e) {
    this.bedSelectModalVisible = true;
    e.preventDefault();
  }

  ngOnInit() {
    this._getListLender();
    this.getApoloUrl();
  }
}
