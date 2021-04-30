import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationcComponent } from './personal-informationc.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule} from "../../components/components.module";
import { DevextremeModule} from "../../components/devextreme/devextreme.module"
import { FormsModule } from "@angular/forms";
import { PopoverComponent } from './component/popover/popover.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationcComponent,
    children: [
      {
        path: 'new-user',
        component: CreateUsersComponent
      }
      
    ]
  },
  { path: '**', redirectTo: '', component:CreateUsersComponent }
];


@NgModule({
  declarations:
   [
      PersonalInformationcComponent,
      CreateUsersComponent,
      PopoverComponent
    ],
  imports: [   
    FormsModule, 
    ComponentsModule,
    DevextremeModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PersonalInformationcModule { }
