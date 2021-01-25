import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentManagementComponent } from './appointment-management.component';
import { HistoryMedicalAppointmentsComponent } from './history-medical-appointments/history-medical-appointments.component';
import { IndividualAppointmentsComponent } from './individual-appointments/individual-appointments.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { ParticularAppointmentsComponent } from './particular-appointments/particular-appointments.component';
import { DevextremeModule } from 'src/app/components/devextreme/devextreme.module';
import { ProgramateAppointmentComponent } from './programate-appointment/programate-appointment.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ListPatientsScheduleAppointmentComponent } from './list-patients-schedule-appointment/list-patients-schedule-appointment.component';

import { ConfirmWaitingListComponent } from './confirm-waiting-list/confirm-waiting-list.component';
import { AppointmentsMedicalBoardComponent } from './appointments-medical-board/appointments-medical-board.component';
import { CurrentProgrammingDataComponent } from './current-programming-data/current-programming-data.component';
const routes: Routes = [
  {
    path: '',
    component: AppointmentManagementComponent,
    children: [
      {
        path: 'listar-citas',
        component: ProgramateAppointmentComponent,
      },
      {
        path: 'citas',
        component: ParticularAppointmentsComponent,
      },
      // {
      //   path: 'citas-individuales',
      //   component: IndividualAppointmentsComponent,
      // },
      {
        path: 'listar-citas-espera',
        component: ListPatientsScheduleAppointmentComponent
      },
      // {
      //   path: 'citas-grupales/citas-especiales',
      //   component: ParticularAppointmentsComponent,
      // },
      {
        path: 'citas-junta-medica',
        component: AppointmentsMedicalBoardComponent
      },
      {
        path: 'historico-citas',
        component: HistoryMedicalAppointmentsComponent
      },
      {
        path: '**',
        redirectTo: 'listar-citas',
        pathMatch: 'full'
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppointmentManagementComponent, 
    HistoryMedicalAppointmentsComponent,
    IndividualAppointmentsComponent,
    ProgramateAppointmentComponent,
    ListPatientsScheduleAppointmentComponent,
    ParticularAppointmentsComponent,
    ProgramateAppointmentComponent,
    ConfirmWaitingListComponent,
    AppointmentsMedicalBoardComponent,
    CurrentProgrammingDataComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DevextremeModule,
    ComponentsModule,
    TranslateModule
  ],
  providers: [
    TranslateService
  ]
})
export class AppointmentManagementModule { }