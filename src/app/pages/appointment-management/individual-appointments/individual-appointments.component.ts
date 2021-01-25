import { TypeOfSpecialty } from './../list-patients-schedule-appointment/models/list-patients-module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { custom } from 'devextreme/ui/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GenericsService } from 'src/app/services/generic.service';
import { AppointmentTypeDTO, HeadquarteresDTO } from 'src/app/models/appointmentDTO';
import CustomStore from 'devextreme/data/custom_store';
import { AppointmentPerIdDTO, GetAppointmentIndividualtytiDTO, CitaDTO } from './models/appointment.models';
import { AppointmentsService } from './services/appointment.service';
import { DxSelectBoxComponent, DxFormComponent } from 'devextreme-angular';
import { SharedService } from 'src/app/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { isPatientInfoLoaded } from 'src/app/store/actions';
import { filter } from 'rxjs/operators';
import { PatienteInfo } from 'src/app/store/stateModels/patient-info';
import { SessionService } from 'src/app/services/session.service';
import { EnumsSelfManagement } from 'src/app/enums/selfmanagement.enum';

@Component({
  selector: 'oph-individual-appointments',
  templateUrl: './individual-appointments.component.html',
  styleUrls: ['./individual-appointments.component.css']
})
export class IndividualAppointmentsComponent implements OnInit {
  @ViewChild("selectbox") selectBox: DxSelectBoxComponent;
  @ViewChild('form') form: DxFormComponent;
  
  private timeoutCounter = null;
  isSearching = false;
  selfmanagement = false; // Identificador de autogestión
  gridData: GetAppointmentIndividualtytiDTO[] = [];
  dataForm = {
    idTipoCita: '',
    professional: '',
    specialty: '',
    process: null,
    date: '',
    campus: ''
  };
  objectWaitingList = {
    tipoDocumento: '',
    tipoDocumentoId: '',
    numeroDocumento: '',
    tipoCita: '',
    especialidad: '',
    procedimiento: '',
    telefono: ''
  };
  dataFrm: any = {
    appointmentTypeId: '',
    speciality: '',
    procedure: '',
    headquarter: ''
  };
  appointmentTypeList: AppointmentTypeDTO[] = [];;
  specialtyList: TypeOfSpecialty[] = [];
  procedureList: AppointmentTypeDTO[] = [];;
  campusList: HeadquarteresDTO[] = [];
  professionalList: TypeOfSpecialty[] = [];
  profesional: TypeOfSpecialty;
  infopatient: PatienteInfo;

  indexTypeCita: any;
  indexSpecialty: any;
  indexProcess: any;

  isActiveSearch = true;

  idAppointment: string = null;

  scheduledAppointment: AppointmentPerIdDTO;
  appointmentSave: CitaDTO;
  newScheduledAppointment: any;
  showScheduledAppointment = false;
  disableFields = false;
  focusedRowKey = 2;
  autoNavigateToFocusedRow = true;

  popupVisible = false;
  popupVisibleWaitingList = false;
  FullScreen = false;

  CustomStore: CustomStore;

  buttonOptions = {
    text: 'Buscar',
    type: 'success',
    icon: 'fas fa-search',
    useSubmitBehavior: false,
    onClick: () => this.searchAppointments(),
    width: '35%'
  };

  minDate: Date = new Date();

  editorOptionsProfessional = {}

  constructor(private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private servicegeneric: GenericsService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private sharedService: SharedService,
    private store: Store<AppState>,
    private sessionService:SessionService) {
    this.onchangedValue = this.onchangedValue.bind(this);
  }

  ngOnInit() {

    this.store.dispatch(isPatientInfoLoaded());
    this.store.select(state => state.patientInfo).pipe(filter(data => !!data))
      .subscribe(info => {
        this.infopatient = info
      });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["id"]) {
        this.idAppointment = params["id"];
        this.showScheduledAppointment = true;
        this.disableFields = true;
        this.isActiveSearch = false;

        this.appointmentService.GetAppointmentPerId(params["id"]).subscribe(result => {
          this.scheduledAppointment = result;
          this.indexTypeCita = this.appointmentTypeList.findIndex(e => e.descripcionDTO == this.scheduledAppointment.tipoCItaDTO);
          this.indexSpecialty = this.specialtyList.findIndex(e => e.descripcionDTO == this.scheduledAppointment.especialidadDTO);
          //this.indexProcess = this.CustomStore.keyOf(e => e.descripcionDTO == this.scheduledAppointment.procedimientoDTO);
          //this.onchangedValue(this.specialtyList.find(e => e.descripcionDTO == this.scheduledAppointment.especialidadDTO).idDTO);


          /*se asocian ids a dataform cuando el proceso es reprogramar*/

          this.servicegeneric.GetAllAppoitmentType().subscribe(res => {
            this.appointmentTypeList = res.result;
            this.dataForm.idTipoCita = this.appointmentTypeList.find(e => e.descripcionDTO == this.scheduledAppointment.tipoCItaDTO).idDTO;
            //this.indexTypeCita = this.appointmentTypeList.findIndex(e => e.descripcionDTO == this.scheduledAppointment.tipoCItaDTO);
          })

          this.servicegeneric.GetMedicalSpeciality()
            .subscribe(resp => {
              this.specialtyList = resp.result;
              this.dataForm.specialty = this.specialtyList.find(e => e.descripcionDTO == this.scheduledAppointment.especialidadDTO).idDTO;
              this.servicegeneric.GetMedicalProceduresInterconsulting(this.dataForm.specialty)
                .subscribe((resp: any) => {
                  this.procedureList = resp;
                  this.dataForm.process = this.procedureList.find(e => e.descripcionDTO == this.scheduledAppointment.procedimientoDTO).idDTO;
                });
            });

          this.servicegeneric.GetHeadquarters()
            .subscribe(resp => {
              this.campusList = resp.result;
            });
        })

      } else if (params["idWaitList"]) {
        this.isActiveSearch = true;

        this.appointmentService.GetWaitinListById(params["idWaitList"], "7CDD8BCB-444C-40BC-8618-CD5AD1B744A5").subscribe(result => {
          this.scheduledAppointment = result.result;

          this.servicegeneric.GetAllAppoitmentType().subscribe(res => {
            this.appointmentTypeList = res;
            this.dataForm.idTipoCita = result.tipoCitaId;
          })

          this.servicegeneric.GetMedicalSpeciality()
            .subscribe(resp => {
              this.specialtyList = resp.result;
              this.dataForm.specialty = result.especialidadId;
            });

          this.servicegeneric.GetHeadquarters()
            .subscribe(resp => {
              this.campusList = resp.result;
              this.dataForm.campus = result.sedeDeseadaId;
            });

          this.servicegeneric.GetMedicalProceduresInterconsulting(result.sedeDeseadaId)
            .subscribe((resp: any) => {
              this.procedureList = resp;
              this.dataForm.process = result.procedimientoId;
            });


          this.dataForm.date = result.fechaDeseada;

        });

      } else {
        this.isActiveSearch = true;
        this.servicegeneric.GetAllAppoitmentType().subscribe(res => {
          this.appointmentTypeList = res.result;
        })

        this.servicegeneric.GetMedicalSpeciality()
          .subscribe(resp => {
            this.specialtyList = resp.result;
          });

        this.servicegeneric.GetHeadquarters()
          .subscribe(resp => {
            this.campusList = resp.result;
          });
      }
    });

    this._validateSelFmanagement()
  }

  onFocusedRowChanging(e) {
    var rowsCount = e.component.getVisibleRows().length,
      pageCount = e.component.pageCount(),
      pageIndex = e.component.pageIndex(),
      key = e.event && e.event.key;

    if (key && e.prevRowIndex === e.newRowIndex) {
      if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
        e.component.pageIndex(pageIndex + 1).done(function () {
          e.component.option("focusedRowIndex", 0);
        });
      } else if (e.newRowIndex === 0 && pageIndex > 0) {
        e.component.pageIndex(pageIndex - 1).done(function () {
          e.component.option("focusedRowIndex", rowsCount - 1);
        });
      }
    }
  }

  searchAppointments() {
    if (this.form.instance.validate().isValid) { 
      this.dataForm.professional = this.dataForm.professional == null ? '' : this.dataForm.professional;
      this.dataForm.campus = this.dataForm.campus == null ? '' : this.dataForm.campus;

      if(this.dataForm.date !== '' )
      this.dataForm.date = this.dataForm.date == null ? '' : new Date(this.dataForm.date).toISOString();

      this.appointmentService.SearchAppointments(this.dataForm).subscribe(rest => {
        console.log(rest);
        if (rest.length === 0) {
          this.gridData = [];
          this.waitingList();
        } else {
          this.gridData = rest;
        }
      })
    }

  }
  waitingList() {
    custom({
      title: `${this.translateService.instant('individualAppointments.validation.title')}`,
      messageHtml: `<div style="text-align: center">
                    <img src="./assets/images/iconoAlerta.png" class="dialog-img">
                    <b>${this.translateService.instant('individualAppointments.validation.mainMessage')}</b> 
                    <br> <br>
                    ${this.translateService.instant('individualAppointments.validation.message')}
                  </div>`,
      buttons: [
        {
          text: "Lista de espera",
          type: "success",
          onClick: (e) => {
            this.addWaitingList();
            this.popupVisibleWaitingList = true;
          }
        },
        {
          text: "Nueva búsqueda",
          onClick: (e) => {
            return { buttonText: e.component.option("text") }
          }
        }
      ]
    }).show();

  }

  configureProcedureStore() {
    this.CustomStore = new CustomStore({
      load: (loadOptions) => {
        const filter = loadOptions.searchValue ? loadOptions.searchValue : "";
        return this.servicegeneric.GetMedicalProcedureByDescription(filter).toPromise();
      }
    });
  }

  saveWaitingList() {
    console.log("text");
  }

  onFocusedRowChanged(e) {
    this.popupVisible = true;
    this.newScheduledAppointment = e;
    this.newScheduledAppointment.tipoCita = this.appointmentTypeList.find(r => r.idDTO === this.dataForm.idTipoCita).descripcionDTO;
  }

  addWaitingList() {
    this.objectWaitingList.tipoDocumento = this.infopatient.typeDocument;
    this.objectWaitingList.tipoDocumentoId = this.infopatient.typeDocumentId;
    this.objectWaitingList.numeroDocumento = this.infopatient.numberDocument;
    this.objectWaitingList.telefono = this.infopatient.telephoneDTO;
    this.dataFrm = {
      appointmentTypeId: this.dataForm.idTipoCita,
      speciality: this.dataForm.specialty,
      procedure: '',
      procedureMedic: this.dataForm.process,
      headquarter: this.dataForm.campus
    };
  }

  onResult = (show: boolean) => {
    if (!show)
      this.popupVisibleWaitingList = false;
  }

  click(e) {
    this.popupVisible = false;
  }

  saveAppointment(e) {
    this.appointmentSave = {
      autorizacionAsegurador: null,
      detalleProcedimientoAgenda: this.dataForm.process,
      especialidadMedica: this.dataForm.specialty,
      fechaCita: this.newScheduledAppointment.fecha,
      horaCita: this.newScheduledAppointment.hora,
      id: (this.idAppointment != null || this.idAppointment != undefined) ? this.idAppointment : null,
      idProfesional: this.professionalList.find(r => r.descripcionDTO == this.newScheduledAppointment.profesional).idDTO,
      persona: this.infopatient.personId,
      tipoCita: this.dataForm.idTipoCita,
      instalacionPrestador: this.campusList.find(r => r.descriptionDTO == this.newScheduledAppointment.sede).idDTO,
      opheliaUser: this.sessionService.session.accountCode
    }

    let resultExecute;

    this.appointmentService.SaveAppointment(this.appointmentSave).subscribe(rest => {

      if (rest.isSuccessful) {
        this.router.navigate(['/appointment-management/listar-citas'], { queryParams: {selfmanagement: this._getValSeflManagement()} });
      } else {
        this.sharedService.error(rest.messages);
      }

      resultExecute = rest;
    });

  }

  closed() {
    this.popupVisibleWaitingList = false;
  }

  onProcedureChange = (e) => {
    if (e && e.value && this.objectWaitingList)
      this.objectWaitingList.procedimiento = this.procedureList.find(r => r.idDTO == e.value).descripcionDTO;

  }

  onSpecialityChange = (e) => {
    if (e && e.selectedItem && this.objectWaitingList)
      this.objectWaitingList.especialidad = e.selectedItem.descripcionDTO;
    this.onchangedValue(e)
  }

  onAppointmentTypeChange = (e) => {
    if (e && e.selectedItem && this.objectWaitingList)
      this.objectWaitingList.tipoCita = e.selectedItem.descripcionDTO;
  }

  onchangedValue(e) {
    if (this.idAppointment != null || this.idAppointment != undefined) {
      let value = (e.selectedItem.idDTO == undefined) ? e : e.selectedItem.idDTO;

      this.servicegeneric.GetProfessionalsPerSpecialty(value).subscribe(resp => {
        this.professionalList = [] = [];
        for (let index = 0; index < resp.result.length; index++) {
          const element = resp?.result[index];
          this.profesional = {
            idDTO: element.idDTO,
            descripcionDTO: element.nombrePrimer + ' ' + element.apellidoPrimer,
            estadoDTO: true
          };
          this.professionalList.push(this.profesional)
        }
        this.editorOptionsProfessional = {
          dataSource: this.professionalList,
          displayExpr: 'descripcionDTO',
          valueExpr: 'idDTO',
          showClearButton: true
        }
      }
      )
      //this.configureProcedureStore();
    } else {
      if (e.selectedItem !== undefined) {

        this.servicegeneric.GetMedicalProceduresInterconsulting(e.selectedItem.idDTO)
          .subscribe((resp: any) => {
            this.procedureList = resp;
          });

        this.servicegeneric.GetProfessionalsPerSpecialty(e.selectedItem.idDTO).subscribe(resp => {
          this.professionalList = [] = [];
          for (let index = 0; index < resp.result.length; index++) {
            const element = resp?.result[index];
            this.profesional = {
              idDTO: element.idDTO,
              descripcionDTO: element.nombrePrimer + ' ' + element.apellidoPrimer,
              estadoDTO: true
            };
            this.professionalList.push(this.profesional)
          }
          this.editorOptionsProfessional = {
            dataSource: this.professionalList,
            displayExpr: 'descripcionDTO',
            valueExpr: 'idDTO',
            showClearButton: true
          }
        }
        )
      }

    }
  }

  private _validateSelFmanagement(){
    this.activatedRoute.queryParams.subscribe(
      params => this.selfmanagement = params['selfmanagement'] === EnumsSelfManagement.TYPE_OK);
  }

  private _getValSeflManagement = () => this.selfmanagement ? EnumsSelfManagement.TYPE_OK : EnumsSelfManagement.TYPE_BAD;
}
