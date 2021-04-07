import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes 
import {PatientInfoComponent} from "../components/patient-info/patient-info.component";
import { SurgicalPatientComponent } from './surgical-patient/surgical-patient.component';



@NgModule({
  declarations: [PatientInfoComponent, SurgicalPatientComponent],
  imports: [
    CommonModule
  ],
  exports:[
    PatientInfoComponent,
    SurgicalPatientComponent
  ]
  
})
export class PharmacyModule { }
