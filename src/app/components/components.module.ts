import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { RoundButtonComponent } from './round-button/round-button.component';
import { RouterModule } from '@angular/router';
import { ListCardHeaderComponent } from './list-card-header/list-card-header.component';
import { DevextremeModule } from './devextreme/devextreme.module';
import { TitleBreadcumsComponent } from './layouts/title-breadcums/title-breadcums.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';
import { BadgetComponent } from './badget/badget.component';
import { CardRecordComponent } from './card-record/card-record.component';
import { PopupComponent } from './popup/popup.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { SafePipe } from '../pipes/urlSafer';
import { VersionComponent } from './version/version.component';
import { InfoPatientTopComponent } from './info-patient-top/info-patient-top.component';
// import { HalfCircleMenuComponent } from './half-circle-menu/half-circle-menu.component';

//External libraries
// import { FanMenuModule } from 'fan-menu';

@NgModule({
  declarations: [
    RoundButtonComponent,
    ListCardHeaderComponent,
    TitleBreadcumsComponent,
    TitleBreadcumsComponent,
    ContextMenuComponent,
    TabsMenuComponent,
    BadgetComponent,
    CardRecordComponent,
    PopupComponent,
    ItemCardComponent,
    InfoPanelComponent,
    VersionComponent,
    SafePipe,
    InfoPatientTopComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DevextremeModule,
  ],
  exports: [
    RoundButtonComponent,
    ListCardHeaderComponent,
    TitleBreadcumsComponent,
    TabsMenuComponent,
    ContextMenuComponent,
    BadgetComponent,
    CardRecordComponent,
    PopupComponent,
    ItemCardComponent,
    InfoPanelComponent,
    VersionComponent,
    SafePipe,
    InfoPatientTopComponent
  ]
})
export class ComponentsModule { }
