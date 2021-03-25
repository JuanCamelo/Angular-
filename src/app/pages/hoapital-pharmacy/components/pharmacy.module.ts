import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes 
import {PatientInfoComponent} from "../components/patient-info/patient-info.component";



@NgModule({
  declarations: [PatientInfoComponent],
  imports: [
    CommonModule
  ],
  exports:[
    PatientInfoComponent
  ]
  
})
export class PharmacyModule { }
