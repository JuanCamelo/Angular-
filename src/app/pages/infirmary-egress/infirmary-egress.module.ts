import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfirmaryEgressComponent } from './infirmary-egress.component';
import { DevextremeModule } from 'src/app/components/devextreme/devextreme.module';
import { FormEgressComponent } from './components/form-egress/form-egress.component';


const routes: Routes = [
  {
    path: '',
    component: FormEgressComponent  
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    InfirmaryEgressComponent,
    FormEgressComponent
  ],
  imports: [
    CommonModule,
    DevextremeModule,
    RouterModule.forChild(routes)   
  ]
})
export class InfirmaryEgressModule { }
