import { Component, OnInit, ViewChild } from '@angular/core';
import './localization';
import * as Globalize from 'globalize';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './services/shared.service';
import notify from 'devextreme/ui/notify';
import { ConfigService } from './services/config.service';
import { SessionService } from './services/session.service';
import * as reduxActions from 'src/app/store/actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';

@Component({
  selector: 'oph-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  notificationTitleBackgrounColor = '#223862';
  notificationTitle = '';
  notificationText: string[] = [];
  showPopup = false;
  showLoader: boolean;
  toastOptions = {
    message: '',
    type: '',
    displayTime: 3000,
    closeOnClick: true,
    onHiding: (e: any) => {
      e.element.onclick = () => {
        this.showPopup = true;
      };
    }
  };

  constructor(
    private translateService: TranslateService,
    private sessionService: SessionService,
    public sharedService: SharedService,
    private configService: ConfigService,
    private store: Store<AppState>
  ) {
    this.blockContextMenu();
    // this.configService.clean();
    this.configService.getAppConfig();
  }

  ngOnInit(): void {
    // Obtenemos el idioma de la sesión
    if (this.sessionService.session && this.sessionService.session.selectedLanguage) {
      this.translateService.use(this.sessionService.session.selectedLanguage);
      Globalize.locale(this.sessionService.session.selectedLanguage.split('-')[0]);
    } else {
      this.translateService.use('es-CO');
      Globalize.locale('es');
    }

    // Manejador de eventos disparados desde los iframes
    this.setIframeEventsHandler();

    this.sharedService.loader.subscribe((show: boolean) => {
      setTimeout(() => {
        this.showLoader = show;
      }, 300);
    });

    this.sharedService.successNotification.subscribe((args) => {
      if (args != null) {
        this.notificationTitleBackgrounColor = '#5cb85c';
        this.notificationTitle = this.translateService.instant('popUpShowNotifyMessage.title.success');
        this.notificationText = (typeof (args.message) === 'string' ? [args.message.toString()] : (args.message as string[]));
        if (!args.showPopUp) {
          this.toastOptions.message = (typeof (args.message) === 'string' ? args.message.toString() : (args.message as string[]).reduce((a, b) => `${a} ■ ${b}`, ''));
          this.toastOptions.type = 'success';
          notify(this.toastOptions);
        } else {
          this.showPopup = true;
        }
      }
    });

    this.sharedService.errorNotification.subscribe((args) => {
      if (args != null) {
        this.notificationTitleBackgrounColor = '#dc3545';
        this.notificationTitle = this.translateService.instant('popUpShowNotifyMessage.title.error');
        this.notificationText = (typeof (args.message) === 'string' ? [args.message.toString()] : (args.message as string[]));
        if (!args.showPopUp) {
          this.toastOptions.message = (typeof (args.message) === 'string' ? args.message.toString() : (args.message as string[]).reduce((a, b) => `${a} ■ ${b}`, ''));
          this.toastOptions.type = 'error';
          notify(this.toastOptions);
        } else {
          this.showPopup = true;
        }
      }
    });

    this.sharedService.warningNotification.subscribe((args) => {
      if (args != null) {
        this.notificationTitleBackgrounColor = '#f0ad4e';
        this.notificationTitle = this.translateService.instant('popUpShowNotifyMessage.title.warning');
        this.notificationText = (typeof (args.message) === 'string' ? [args.message.toString()] : (args.message as string[]));
        if (!args.showPopUp) {
          this.toastOptions.message = (typeof (args.message) === 'string' ? args.message.toString() : (args.message as string[]).reduce((a, b) => `${a} ■ ${b}`, ''));
          this.toastOptions.type = 'warning';
          notify(this.toastOptions);
        } else {
          this.showPopup = true;
        }
      }
    });
    this.sharedService.infoNotification.subscribe((args) => {
      if (args != null) {
        this.notificationTitleBackgrounColor = '#223862';
        this.notificationTitle = this.translateService.instant('popUpShowNotifyMessage.title.info');
        this.notificationText = (typeof (args.message) === 'string' ? [args.message.toString()] : (args.message as string[]));
        if (!args.showPopUp) {
          this.toastOptions.message = (typeof (args.message) === 'string' ? args.message.toString() : (args.message as string[]).reduce((a, b) => `${a} ■ ${b}`, ''));
          this.toastOptions.type = 'info';
          notify(this.toastOptions);
        } else {
          this.showPopup = true;
        }
      }
    });
  }

  setIframeEventsHandler() {
    window.addEventListener('message', (e) => {
      if (e.data.eventName) {
        switch (e.data.eventName) {
          case 'changeCompany':
            this.sharedService.changeCompany(e.data.company);
            break;
          default:
            break;
        }
      }
    }, false);
  }

  private blockContextMenu() {
    const docObj: any = document;
    const winObj: any = window;
    if (docObj.addEventListener) {
      docObj.addEventListener('contextmenu', (e: any) => {
        e.preventDefault();
      }, false);
    } else {
      docObj.attachEvent('oncontextmenu', () => {
        winObj.event.returnValue = false;
      });
    }
  }
}
