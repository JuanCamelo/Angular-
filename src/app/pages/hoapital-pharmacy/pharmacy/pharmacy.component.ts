import { HttpParams } from '@angular/common/http';
import { ActivatedRoute} from "@angular/router"
import { Component, OnInit ,ViewChild} from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { PatienteDTO } from "../models/patientDTO";
import * as settings from "../../../../assets/helpers/global-settings.json";
import { ServicePharmacyService , datospaciente, StatusM, Medicamentos} from "../service/service-pharmacy.service"
import { from } from 'rxjs';



@Component({
  selector: 'oph-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  
  public whenClicked = [false,false];
  existPatien = false;
  public bedSelectModalVisible = false;
  public isAddForm = false;
  public infoPatient: PatienteDTO[];
  public medicalStatus : StatusM[];
  public ordenSuministro : any[];
  public isumosList:any [];

  public formDataRequest = {
    idInsumo:'',
    cantidad:'',
    descripcion:''
  }
  /////vefificar si estan en uso estas varuiables
  public products: any []
  public product:any= [];
  public timeoutCounter;
  @ViewChild("selectboxSearch") filterMedicineTextBox: DxTextBoxComponent;

  constructor
  (
    private route: ActivatedRoute,
    private servicePharmacy : ServicePharmacyService
  ) 
  { this.medicalStatus = this.servicePharmacy._getMedicamentos();}

  private _getListLender() {
    const params =this.route.snapshot.paramMap.get('orden');
    this.servicePharmacy._getInfoPatient(params).subscribe((response: any) => {
      if (!response.isValid) {
        this.infoPatient = [...response]  
        this.ordenSuministro =[...response.listOrdenMedica]           
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
  onAddIsumoFormSubmit(e:any){
        e.preventDefault(); 
          
  }

  

  //envio de insumos 
  onSutmitSumitMedicine(e:any){
    
  }

 
  ///limpiar codigo hacia abajo


  onActionClickSutmit(e){
    
    this.bedSelectModalVisible = true;
    e.preventDefault();
    
    
  }
  

  onVisibiliti(e){
    return this.isAddForm  ? this.isAddForm = false : this.isAddForm = true;
  }
  onActionAddform(e){  }



 
    
  


  ngOnInit() {
    this._getListLender();
  }

}
