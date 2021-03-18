import { HttpParams } from '@angular/common/http';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { ServicePharmacyService , datospaciente, StatusM, Medicamentos, Product} from "../service/service-pharmacy.service"



@Component({
  selector: 'oph-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  public bedSelectModalVisible = false;
  public isAddForm = false;
  public tableroBoard: datospaciente[];
  public medicalStatus : StatusM[];
  public Rmedicamentos : Medicamentos[];
  public products: Product[];
  public product:any= [];
  public timeoutCounter;
  @ViewChild("filterTxt") filterMedicineTextBox: DxTextBoxComponent;

  


  constructor
  (
    private service : ServicePharmacyService
  ) 
  { 
    this.products = this.service._getProdut();
    this.tableroBoard = this.service._getPatiente();
    this.medicalStatus = this.service._getMedicamentos();
    this.Rmedicamentos = this.service._getRMedicamento();    
  }

  onActionClickSutmit(e){
    
    this.bedSelectModalVisible = true;
    e.preventDefault();
    
    
  }
  

  onVisibiliti(e){
    return this.isAddForm  ? this.isAddForm = false : this.isAddForm = true;
  }
  onActionAddform(e){  }

 


  onFilterKeyDown(e){  
    clearTimeout(this.timeoutCounter);
    const value = this.filterMedicineTextBox.text;    
    this.timeoutCounter = setTimeout(() => {
       if(value.length >= 3){   
          let data :Product[] = this.service._getProdut();
           console.log(data) 
        return data;
      }
     }, 1000);
  }

 




  formDataRequest ={
    descripcion: ""
  }
    
  


  ngOnInit() {
  }

}
