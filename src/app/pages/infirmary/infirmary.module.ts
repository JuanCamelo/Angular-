import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfirmaryComponent } from './infirmary.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InfirmaryComponent,
    children: [
      {
        path: 'administracion-medicamentos',
        component: InfirmaryComponent,
      },
      {
        path: '**',
        redirectTo: 'administracion-medicamentos',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [InfirmaryComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class InfirmaryModule { }
