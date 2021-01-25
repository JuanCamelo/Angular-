import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { custom } from 'devextreme/ui/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CollectionDTO } from 'src/app/models/Collection';
import { SharedService } from 'src/app/services/shared.service';
import { isPatientInfoLoaded, quitPatientInfo } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { selectPatientInfo } from 'src/app/store/selector/patient-info.selector';
import { AppointmentManagementService } from '../services/appointment-management.service';
import { ProgramateAppointmentDTO } from './models/models.programate';
import { GenericsService } from '../../../services/generic.service';
import * as reduxActions from 'src/app/store/actions';
import { DxFormComponent } from 'devextreme-angular';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import notify from 'devextreme/ui/notify';
import { EnumsSelfManagement } from 'src/app/enums/selfmanagement.enum';

@Component({
  selector: 'oph-programate-appointment',
  templateUrl: './programate-appointment.component.html',
  styleUrls: ['./programate-appointment.component.scss']
})
export class ProgramateAppointmentComponent implements OnInit {

  patient: any;
  infopatient: any;
  existPatien = false;
  documentTypeList = []
  IdCitaPersona: string;
  selfmanagement = false; // Identificador de autogestión
  isVisibleCancel = false;
  isVisibleHistory = false;
  messageMotiveCancel: string;
  gridData: ProgramateAppointmentDTO[];
  $Motivos: Observable<Array<CollectionDTO>>;
  $DataGrid: Observable<Array<ProgramateAppointmentDTO>>;
  loginForm: { IdTipoDocumento: string; TipoDocumentoDescripcion: string; NumeroDocumento: string; };

  @ViewChild('form') form: DxFormComponent;
  @ViewChild("slcBoxMotivos") slBoxMotivos: DxTextBoxComponent;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private genericsService: GenericsService,
    private translateService: TranslateService,
    private appointmentManagService: AppointmentManagementService) 
    {
      this.loginForm = { IdTipoDocumento: '', TipoDocumentoDescripcion: '', NumeroDocumento: '' };

      this.popUpCancelAppointment = this.popUpCancelAppointment.bind(this);
      this.redirectToReagendar = this.redirectToReagendar.bind(this);
      this.messageMotiveCancel = this.translateService.instant('cancelAppointment.message.motive.confirm');
  }

  ngOnInit() {
    this.getDocumentTypes();
    this._initializeData();
  }

  popUpCancelAppointment = (e) => {
    this.IdCitaPersona = e.row.data.idCitaPersona
    custom({
      messageHtml: `<div style="text-align: center">
                      <img src="./assets/images/iconoAlerta.png" class="dialog-img">
                      <b>${this.translateService.instant('cancelAppointmentProgramate.title')}</b> 
                      <br> <br>
                      ${this.translateService.instant('cancelAppointment.message.confirm')}
                      
                    </div>`,
      buttons: [
        {
          text: "Aceptar",
          type: "success",
          onClick: (e) => {
            this.isVisibleCancel = true;
          }
        },
        {
          text: "Cerrar",
          type: "danger",
          onClick: (e) => {
            this.isVisibleCancel = false;
          }
        }
      ]
    }).show();
  }

  redirectToReagendar(e) {
    this.store.select(state => state.patientInfo).pipe(filter(data => !!data)).subscribe(info => this.infopatient = info );
    let queryParams = {documentType: this.loginForm.IdTipoDocumento, documentNumber: this.loginForm.NumeroDocumento, id: e.row.data.idCita, selfmanagement: this._getValSeflManagement()};
    this.router.navigate(['/appointment-management/citas'], { queryParams: queryParams, queryParamsHandling: 'merge' });   
  }

  redirectToAgendar(e) {
    this.router.navigate(['/appointment-management/citas-individuales'], { queryParamsHandling: 'merge' });
  }

  redirectToAgendarGroup(e) {
    let queryParams = { documentType: this.loginForm.IdTipoDocumento, documentNumber: this.loginForm.NumeroDocumento, selfmanagement: this._getValSeflManagement()}
    this.router.navigate(['/appointment-management/citas'], { queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  showHistory(e) {
    this.isVisibleHistory = true;
  }

  executeCancel(idMotivo: string) {
    if (idMotivo && idMotivo != '')
      this.appointmentManagService.UpdateCancelScheduledAppointment(this.IdCitaPersona, idMotivo)
        .subscribe(res => {
          this._selectPatient()
          this.sharedService.success(res[0]);
          this.isVisibleCancel = false;
          this.slBoxMotivos.value = '';
        });
  }

  //Seccion de info paciente
  getPatient() {
    this.genericsService.GetInfoPatient(this.loginForm.IdTipoDocumento, this.loginForm.NumeroDocumento).subscribe(response => {

      if (response.result) {
        this.patient = response.result;
        this.goToScheduledAppointments();
        //#region TODO: Se debe validar esta funcionalidad de Validación de derechos
        // custom({
        //   title: `${this.translateService.instant('patientIdentityValidation.validation.title')}`,
        //   messageHtml: `<div style="text-align: center">
        //                   <img src="./assets/images/iconoAlerta.png" class="dialog-img">
        //                   <b>${this.translateService.instant('patientIdentityValidation.validation.mainMessage')}</b> 
        //                   <br> <br>
        //                   ${this.translateService.instant('patientIdentityValidation.validation.message')}
        //                 </div>`,
        //   buttons: [
        //     {
        //       text: "Si",
        //       type: "success",
        //       onClick: (e) => {
        //         this.goToScheduledAppointments();
        //       }
        //     },
        //     {
        //       text: "No",
        //       type: "danger",
        //       onClick: (e) => {
        //         this.goToScheduledAppointments();
        //       }
        //     }
        //   ]
        // }).show();
        //#endregion
      } else if(this.selfmanagement) {
        notify(this.translateService.instant('patientIdentityValidation.warning.mainMessage'));
      } else {
        custom({
          title: '',
          messageHtml: `<div style="text-align: center">
                          <img src="./assets/images/iconoAlerta.png" class="dialog-img">
                          <b>${this.translateService.instant('patientIdentityCreate.validation.mainMessage')}</b> 
                          <br> <br>
                          ${this.translateService.instant('patientIdentityCreate.validation.message')}
                        </div>`,
          buttons: [
            {
              text: "Continuar",
              type: "success",
              onClick: (e) => {
                this.genericsService.openTemplate(this.loginForm.NumeroDocumento);
                this.existPatien = false;
              }
            },
            {
              text: "Cerrar",
              type: "danger",
              onClick: (e) => {
                this.store.dispatch(quitPatientInfo());
                this.existPatien = false;
              }
            }
          ]
        }).show();
      }
    })
  }

  goToScheduledAppointments() {
    this.store.dispatch(reduxActions.setPatientInfo({ patientInfo: this.patient }));
    this.existPatien = true;
    this.store.dispatch(isPatientInfoLoaded());
    this._initializeData();
  }

  getPopUpOptions() { }

  getDocumentTypes() {
    this.genericsService.GetAllTypeDocuments().subscribe(res => this.documentTypeList = res)
  }

  onSubmitForm = (e) => {
    if(e.element.textContent === 'Buscar'){
      if (this.form.instance.validate().isValid){
        this.getPatient()
      } else{
        this.sharedService.warning("Debe ingresar información válida en los campos de Tipo y No° de Documento")
      }
    } else{
      this.router.navigate(['/appointment-management/listar-citas-espera']);
    }
  }

  private _initializeData() {
    this.$Motivos = this.appointmentManagService.GetReasonCancellationAppointment()
    
    this._selectPatient()
    this._validateSelFmanagement()
  }

  private _selectPatient() {
    this.store.select(selectPatientInfo).subscribe(p => {
      if (p){
        this.existPatien = true;
        this.$DataGrid = this.appointmentManagService.GetAppointmentPerson(p.personId);
      }
    })
  }

  private _validateSelFmanagement() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.selfmanagement = params['selfmanagement'] === EnumsSelfManagement.TYPE_OK
        this._pushParameterPatient((params['documentNumber'] || new String()), (params['documentType'] || new String()))
      });
  }

  private _pushParameterPatient(documentNumber: string, documentType: string) { 
    if(this.patient?.personId != null || documentNumber.length === 0 || documentType.length === 0) return;

    this.loginForm = {...this.loginForm, NumeroDocumento: documentNumber, IdTipoDocumento: documentType.toLowerCase()}
    this.getPatient()
  }

  private _getValSeflManagement = () => this.selfmanagement ? EnumsSelfManagement.TYPE_OK : EnumsSelfManagement.TYPE_BAD;
}
