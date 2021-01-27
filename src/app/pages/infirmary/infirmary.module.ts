import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfirmaryComponent } from './infirmary.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { DevextremeModule } from 'src/app/components/devextreme/devextreme.module';
import { MedicineAdministrationComponent } from './componentes/medicine-administration/medicine-administration.component';
import { MedicineTableComponent } from './componentes/medicine-table/medicine-table.component';
import { MedicineFormComponent } from './componentes/medicine-form/medicine-form.component';
import { DxFileUploaderModule } from 'devextreme-angular';
import { GridHeaderColorDirectiveModule } from 'src/app/directive/grid-header-color.directive';


const routes: Routes = [
  {
    path: '',
    component: InfirmaryComponent,
    children: [
      {
        path: 'administracion-medicamentos',
        component: MedicineAdministrationComponent,
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
  declarations: [InfirmaryComponent, MedicineAdministrationComponent, MedicineTableComponent, MedicineFormComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DevextremeModule,
    DxFileUploaderModule,
    ComponentsModule,
    TranslateModule,
    GridHeaderColorDirectiveModule
  ],
  providers: [
    TranslateService
  ]
})
export class InfirmaryModule { }
