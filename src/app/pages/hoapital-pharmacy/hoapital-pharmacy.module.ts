import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { RouterModule, Routes } from '@angular/router';
import { HospitalPharmacyComponent } from './hospital-pharmacy-components';
import { ComponentsModule } from 'src/app/components/components.module';
import { DevextremeModule } from 'src/app/components/devextreme/devextreme.module';
import { DxBoxModule } from 'devextreme-angular';
import { DxSelectBoxModule, DxListModule, DxTemplateModule } from 'devextreme-angular';


const routes: Routes = [
  {
    path: '',
    component: HospitalPharmacyComponent,
    children: [
      {
        path: 'dispensacion/:orden',
        component: PharmacyComponent,
      },
      {
        path: '**',
        redirectTo: 'dispensacion',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [HospitalPharmacyComponent, PharmacyComponent],
  imports: [
    DxBoxModule,
    ComponentsModule,
    DevextremeModule,
    RouterModule.forChild(routes),
    CommonModule,
    DxSelectBoxModule,
     DxListModule, 
     DxTemplateModule
  ]
})
export class HoapitalPharmacyModule { }
