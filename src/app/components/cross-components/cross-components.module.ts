import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { DevextremeModule } from '../devextreme/devextreme.module';
import { PhysicalExamAdminComponent } from './physical-exam/physical-exam-admin/physical-exam-admin.component';
import { ItemAccordionComponent } from './physical-exam/item-accordion/item-accordion.component';
import { VitalsComponent } from './vitals/vitals.component';
import { DxTooltipModule, DxTemplateModule } from 'devextreme-angular';
import { ComponentsModule } from '../components.module';

@NgModule({
  declarations: [
    DiagnosisComponent,
    PhysicalExamAdminComponent,
    ItemAccordionComponent,
    VitalsComponent,
  ],
  imports: [
    CommonModule,
    DevextremeModule,
    DxTooltipModule,
    DxTemplateModule,
    ComponentsModule
  ],
  exports: [
    DiagnosisComponent,
    PhysicalExamAdminComponent,
    ItemAccordionComponent,
    VitalsComponent
  ]
})
export class CrossComponentsModule { }
