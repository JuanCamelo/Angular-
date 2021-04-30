import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { IndexPageComponent } from './pages/index-page/index-page.component';
// import { SessionGuardService } from './services/session-guard.service';
import { RedirectExternalPageComponent } from './pages/redirect-external-page/redirect-external-page.component';

const routes: Routes = [  
  {
    path: 'user',
    loadChildren: () => import('./pages/personal-informationc/personal-informationc.module').then(m => m.PersonalInformationcModule)
  },
  // {
  //   path: 'redirect-external',
  //   component: RedirectExternalPageComponent
  // },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
