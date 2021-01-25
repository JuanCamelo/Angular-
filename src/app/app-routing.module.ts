import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { IndexPageComponent } from './pages/index-page/index-page.component';
// import { SessionGuardService } from './services/session-guard.service';
import { RedirectExternalPageComponent } from './pages/redirect-external-page/redirect-external-page.component';

const routes: Routes = [
  // {
  //   path: 'patient-identity',
  //   loadChildren: () => import('./pages/patient-identity-validation/patient-identity-validation.module').then(m => m.PatientIdentityValidationModule)
  // },
  {
    path: 'appointment-management',
    loadChildren: () => import('./pages/appointment-management/appointment-management.module').then(m => m.AppointmentManagementModule)
  },
  {
    path: 'infirmary',
    loadChildren: () => import('./pages/infirmary/infirmary.module').then(m => m.InfirmaryModule)
  },
  {
    path: 'redirect-external',
    component: RedirectExternalPageComponent
  },
  {
    path: '**',
    redirectTo: 'infirmary'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
