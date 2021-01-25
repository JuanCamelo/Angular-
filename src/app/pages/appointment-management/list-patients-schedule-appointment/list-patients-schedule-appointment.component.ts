import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GenericsService } from 'src/app/services/generic.service';
import { ListAppointmentDTO, TypeOfAppointment, TypeDocumentDTO, TypeOfSpecialty, TypeOfProcedure, CitasPacientesDTO, TypeOfContract } from './models/list-patients-module';
import { AppointmentManagementService } from '../services/appointment-management.service';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { CollectionDTO } from 'src/app/models/Collection';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { isPatientInfoLoaded } from 'src/app/store/actions';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { EnumsSelfManagement } from 'src/app/enums/selfmanagement.enum';

@Component({
  selector: 'oph-list-patients-schedule-appointment',
  templateUrl: './list-patients-schedule-appointment.component.html',
  styleUrls: ['./list-patients-schedule-appointment.component.css']
})
export class ListPatientsScheduleAppointmentComponent implements OnInit {
  @ViewChild("slBoxMotivos") slBoxMotivos: DxTextBoxComponent;
  
  formDataDatesRequest: ListAppointmentDTO = new ListAppointmentDTO();
  documentTypesList: TypeDocumentDTO[] = [];
  typeOfAppointment: TypeOfAppointment[] = [];
  typeOfSpecialty: TypeOfSpecialty[] = [];
  typeOfProcedure: any[] = [];
  typeOfContract: TypeOfContract[] = [];
  gridAppointments: CitasPacientesDTO[] = [];
  itemsFiltered: any;
  isVisibleCancel = false;
  messageMotiveCancel: string;
  $motivos: Observable<Array<CollectionDTO>>;
  idCita: string;
  selfmanagement = false; // Identificador de autogestión
  constructor(
    private serviceGenericsService: GenericsService,
    private router: Router,
    private translateService: TranslateService,
    private appointmentManagService: AppointmentManagementService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.redirectToReagendar = this.redirectToReagendar.bind(this);
    this.showModalCancel = this.showModalCancel.bind(this);
    this.messageMotiveCancel = this.translateService.instant('cancelAppointment.message.motive.confirm');

    /**
     * Tipo de Especialidad
     */
    this.serviceGenericsService.GetMedicalSpeciality()
      .subscribe(resp => {
        this.typeOfSpecialty = resp.result;
      });

    /**
     * Tipo de cita
     */
    this.serviceGenericsService.GetAllAppoitmentType()
      .subscribe(resp => {
        this.typeOfAppointment = resp.result;
      });
    /**
     * Tipo de Documento
     */
    this.serviceGenericsService.GetAllTypeDocuments()
      .subscribe(resp => {
        this.documentTypesList = resp;
      });
    /**
     * Tipo de contrato
     */
    this.serviceGenericsService.GetAllContractsDescription()
      .subscribe(resp => {
        this.typeOfContract = resp.result;
      })
    /**
   * Motivos cancelacion
   */
    this.serviceGenericsService.GetReasonCancellationWaitAppointment()
      .subscribe(resp => {
        this.$motivos = resp;
      });
  }

  ngOnInit() {
    this.store.dispatch(isPatientInfoLoaded());
    this.getWaitingList();
    this._validateSelFmanagement()
  }

  getWaitingList(){
    this.appointmentManagService.GetWaitinList().subscribe((res: any) => {
      this.gridAppointments = res;
    });
  }

  /**
   * Buscar usuario por filtro
   */
  onSearch(e?) {
    if (e)
      e.preventDefault();

    this.formDataDatesRequest = {
      contrato: this.formDataDatesRequest.contrato !== null ? this.formDataDatesRequest.contrato : "",
      idTipoCita: this.formDataDatesRequest.idTipoCita !== null ? this.formDataDatesRequest.idTipoCita : "",
      idTipoDocumento: this.formDataDatesRequest.idTipoDocumento !== null ? this.formDataDatesRequest.idTipoDocumento : "",
      idTipoEspecialidad: this.formDataDatesRequest.idTipoEspecialidad !== null ? this.formDataDatesRequest.idTipoEspecialidad : "",
      idTipoProcedimiento: this.formDataDatesRequest.idTipoProcedimiento !== null ? this.formDataDatesRequest.idTipoProcedimiento : "",
      numeroDocumento: this.formDataDatesRequest.numeroDocumento !== null ? this.formDataDatesRequest.numeroDocumento : "",
      fechaAsignacion: this.formDataDatesRequest.fechaAsignacion !== null ? this.formDataDatesRequest.fechaAsignacion : null,
      fechaDeseada: this.formDataDatesRequest.fechaDeseada !== null ? this.formDataDatesRequest.fechaDeseada : null,
    }

    this.appointmentManagService.GetWaitinList(this.formDataDatesRequest).subscribe((res: any) => {
      this.gridAppointments = res;
    });
  }

  /**
   * Redirecciona citas individuales o grupales
   * @param e 
   */
  redirectToReagendar(e) {
    const params = { documentType: e.row.data.tipoDocumentoId, documentNumber: e.row.data.numeroDocumento, 
      idWaitList: e.row.data.idListaEspera, id: e.row.data.id, selfmanagement: this._getValSeflManagement() }
    this.router.navigate(['/appointment-management/citas'], { queryParams: params, queryParamsHandling: 'merge' });
  }

  showModalCancel(e) {
    this.idCita = e.row.data.idListaEspera
    this.isVisibleCancel = true;
  }

  onPopUpCancelHide() {
    this.isVisibleCancel = false;
  }

  executeCancel(idMotivo: string) {
    if (idMotivo && idMotivo != '')
      this.serviceGenericsService.UpdateCancelScheduledWaitAppointment(this.idCita, idMotivo)
        .subscribe(res => {
          this.isVisibleCancel = false;
          this.getWaitingList();
          this.slBoxMotivos.value = '';
        });
  }

  onSpecialityChange = (e) => {
    if (e)
      this.serviceGenericsService.GetMedicalProceduresInterconsulting(e.value)
        .subscribe((resp: any) => {
          this.typeOfProcedure = resp;
        });
  }

  private _validateSelFmanagement(){
    this.activatedRoute.queryParams.subscribe(
      params => (this.selfmanagement = params['selfmanagement'] === EnumsSelfManagement.TYPE_OK));
  }
  private _getValSeflManagement = () => this.selfmanagement ? EnumsSelfManagement.TYPE_OK : EnumsSelfManagement.TYPE_BAD;
}