import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { ParticularAppointmentsService } from './particular-appointments.service';
import { GenericsService } from 'src/app/services/generic.service';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectPatientInfo } from "src/app/store/selector/patient-info.selector";
import { isPatientInfoLoaded } from 'src/app/store/actions';
import CustomStore from 'devextreme/data/custom_store';
import { DxFormComponent, DxTagBoxComponent } from 'devextreme-angular';
import { ItemsTab } from '../../../models/TabsMenu';
import { AppointmentsService } from '../individual-appointments/services/appointment.service';
import { GetAppointmentIndividualtytiDTO } from '../individual-appointments/models/appointment.models';
import { custom } from 'devextreme/ui/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import { SessionService } from 'src/app/services/session.service';
import { CALENDARS, DEFAULT_CALENDAR } from 'src/app/models/consts';
import { APPOINTMENTTYPES } from 'src/app/models/enums';
import { EnumsSelfManagement } from 'src/app/enums/selfmanagement.enum';

@Component({
  selector: 'oph-particular-appointments',
  templateUrl: './particular-appointments.component.html',
  styleUrls: ['./particular-appointments.component.css']
})
export class ParticularAppointmentsComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: DxFormComponent;
  @ViewChild('tgBox') tagBox: DxTagBoxComponent;
  private urlApi: string;

  tabs: ItemsTab[] = [
    { icon: "fas fa-calendar-alt" },
    { icon: "fas fa-table" }
  ];

  idAppointment: string = null;

  //Códigos de los tipos de Cita
  appointmentTypesEnum: typeof APPOINTMENTTYPES = APPOINTMENTTYPES;

  //Datasources de los Dropdown
  appointmentTypeList: Array<any> = new Array();
  specialtyList: Array<any> = new Array();
  professionalList: Array<any> = new Array();
  campusList: Array<any> = new Array();
  procedureList: Array<any> = new Array();
  programList: Array<any> = new Array();
  activitiesList: Array<any> = new Array();

  //URL de la microaplicación del calendario
  schedulerFrameUrl: string;

  isRescheduling: boolean = false;
  multipleSelection: boolean = false;

  //Objeto del filtro
  dataForm = this.initializeDataForm();

  //Objeto para la reprogramación y para mostrar las propiedades en lista de espera.
  scheduledAppointment = {
    tipoDocumento: '',
    tipoDocumentoId: '',
    numeroDocumento: '',
    fecha: '',
    hora: '',
    sede: '',
    consultorio: '',
    tipoCita: "",
    especialidad: '',
    procedimiento: '',
    profesional: '',
    telefono: '',
    personaId: '',
    actividad: '',
    programa: '',
    especialidadId: '',
    procedimientoId: ''
  };

  //Objeto para guardar en lista de espera
  dataFrm: any = {
    appointmentTypeId: '',
    appointmentTypeCode: '',
    speciality: '',
    procedure: '',
    headquarter: '',
    program: '',
    activity: '',
  };

  //Objeto donde se guarda la selección al escoger una cita individual de la grilla
  selectedIndividualAppointment: any;

  //Objeto para guardar profesionales y sus especialidades seleccionadas.
  selectedProfessionals = {
    professionals: "",
    specialities: "",
    procedure: "",
  }  

  //Configuración del inputs dropdown
  appointmentTypeConfig = {}
  specialityConfig = {}

  //Variable para el cambio de pestaña entre calendario y formulario
  showCalendar: boolean = true;

  //Configuración de la grilla de individuales
  gridData: GetAppointmentIndividualtytiDTO[] = [];
  autoNavigateToFocusedRow = true;

  minDate: Date = new Date();

  //Configuración de PopUps
  FullScreen = false;
  popupVisible: boolean = false;
  isVisibleWaitingList: boolean = false;

  selfmanagement = false; // Identificador de autogestión
  CustomStore: CustomStore;
  patientInfoSubs: Subscription;
  $PatientInfo: Observable<any>;
  isWaitingListEditing: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private particularAppointmentsService: ParticularAppointmentsService,
    private servicegeneric: GenericsService,
    private store: Store<AppState>,
    private appointmentService: AppointmentsService,
    private translateService: TranslateService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.urlApi = this.configService.config.urlAppointmentScheduler;
  }

  ngOnInit() {
    this.store.dispatch(isPatientInfoLoaded());
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["id"] || params["idWaitList"]) {       
        this.idAppointment = params["id"] ? params["id"] : params["idWaitList"];
        this.isRescheduling = true;
        params["id"] ? this.loadExistingAppointment() : this.loadExistingWaitingList();
      } else {
        this.servicegeneric.GetAllAppoitmentType().subscribe(resTypes => {
          this.getAppointmentTypes(resTypes);
          this.initialize();
        });
      }
    });
  }

  initialize(specialityId?:string){
    this.particularAppointmentsService.GetPrograms().subscribe(res => this.programList = res);
    this.getMedicalSpecialities(specialityId);
    this.checkAppointmentType(true);
    this.servicegeneric.GetHeadquarters().subscribe(resp => this.campusList = resp.result);
    this.loadPatientInfo();
    this._validateSelFmanagement()
    //El scroll de la pagina se pone al inicio
    window.scroll(0,0);
  }

  loadExistingAppointment(){
    this.appointmentService.GetAppointmentPerId(this.idAppointment).subscribe(res => {
      this.servicegeneric.GetAllAppoitmentType().subscribe(resTypes => {
        if(res !== null){
          let appointmentDate = new Date(res.fechaDTO).toLocaleDateString("en-US");
          this.scheduledAppointment = {
            ...this.scheduledAppointment,
            consultorio: res.consultorioDTO,
            especialidad: res.especialidadDTO,
            fecha: appointmentDate,
            hora: res.horaDTO,
            procedimiento: res.procedimientoDTO,
            profesional: res.profesionalDTO,
            sede: res.sedeDTO,
            tipoCita: res.tipoCItaDTO,
            actividad: res.actividadDTO,
            programa: res.programaDTO
          }
          this.dataForm = {
            ...this.dataForm,
            appointmentTypeId: res.tipoCItaIdDTO,
            activity: res.actividadIdDTO,
            program: res.programaIdDTO
          }

          this.getAppointmentTypes(resTypes);
          this.initialize();
          let isMedicalBoard = false;
          let appointmentType = this.appointmentTypeList.find(tc => tc.idDTO == res.tipoCItaIdDTO);

          switch(appointmentType.codigo){
            case APPOINTMENTTYPES.MEDICALBOARD: 
              isMedicalBoard = true;
            break;
            case APPOINTMENTTYPES.PROGRAM: 
              this.dataForm.speciality = null, this.scheduledAppointment.especialidad = "";
            break;
          }

          this.servicegeneric.GetMedicalProceduresInterconsulting(res.especialidadIdDTO, isMedicalBoard).subscribe(procedureList => {
            this.procedureList = procedureList;
            this.dataForm.procedureMedic = res.procedimientoIdDTO;
            this.reschedulingAppointmentTypes(res.especialidadIdDTO, res.profesionalIdDTO, res.profesionalDTO);
            this.getProfessionals(res.especialidadIdDTO, res.especialidadDTO);
          });
        }
      });
    });
  }

  loadExistingWaitingList(){
    this.appointmentService.GetWaitinListById(this.idAppointment, "7CDD8BCB-444C-40BC-8618-CD5AD1B744A5").subscribe(res => {
      this.servicegeneric.GetAllAppoitmentType().subscribe(resTypes => {
        this.dataForm.appointmentTypeId = res.tipoCitaId;
        this.getAppointmentTypes(resTypes);
        if(res !== null){
          this.isWaitingListEditing = true;
          let appointmentDate = new Date(res.fechaHora).toLocaleDateString("en-US");  
          let appointmentHour = new Date(res.fechaHora).toLocaleTimeString();
          
          const specialitiesIds = res.especialidadId.split(",");
          const idSpeciality = specialitiesIds.length > 1 ? specialitiesIds[0] : specialitiesIds;

          const proceduresIds = res.procedimientoId.split(",");
          const idProcedure = proceduresIds.length > 1 ? proceduresIds[0] : proceduresIds;

          this.scheduledAppointment = {
            ...this.scheduledAppointment,
            consultorio: res.sedeDeseada,
            especialidad: res.especialidad,
            fecha: appointmentDate,
            hora: appointmentHour,
            procedimiento: res.procedimiento,
            sede: res.sedeDeseada,
            tipoCita: res.tipoCita,
            actividad: res.actividadDTO,
            programa: res.programaDTO,
            especialidadId: res.especialidadId,
            procedimientoId: res.procedimientoId
          }
          this.dataForm = {
            ...this.dataForm,
            activity: res.actividadId == null ? "" : res.actividadId,
            program: res.programaId
          }
          this.initialize(res.especialidadId);
          let isMedicalBoard = false;
          let appointmentType = this.appointmentTypeList.find(tc => tc.idDTO == res.tipoCitaId);
          if(APPOINTMENTTYPES.MEDICALBOARD === appointmentType.codigo)
            isMedicalBoard = true;
            
          this.servicegeneric.GetMedicalProceduresInterconsulting(idSpeciality, isMedicalBoard).subscribe(procedureList => {
            this.procedureList = procedureList;
            this.dataForm.procedureMedic = idProcedure;
            this.reschedulingAppointmentTypes(res.especialidadId, res.procedimientoId);
            this.getProfessionals(res.especialidadId, res.especialidadDTO);
          });
      }
      });
    });
  }

  loadPatientInfo() {
    this.patientInfoSubs = this.store.select(selectPatientInfo)
      .subscribe((pi) => {
        if (pi) {
          this.scheduledAppointment.numeroDocumento = pi.numberDocument;
          this.scheduledAppointment.tipoDocumento = pi.typeDocument;
          this.scheduledAppointment.tipoDocumentoId = pi.typeDocumentId;
          this.scheduledAppointment.telefono = pi.telephoneDTO;
          this.scheduledAppointment.personaId = pi.personId;
        }
      })
  }

  initializeDataForm(){
    const dataform = {
      appointmentTypeId: "",
      appointmentTypeCode: "",
      speciality: "",
      professional: [],
      program: "",
      activity: "",
      procedure: "",
      procedureMedic: "",
      headquarter: "",
      date: ""
    }
    return dataform;
  }

  reschedulingAppointmentTypes(specialities: string, professionals: string, professionalsDesc?: string){
    this.selectedProfessionals.specialities = specialities;
    const arrSpecialities = specialities.split(",");
    const arrProfessionals = professionals !== undefined ? professionals.split(",") : null;

    this.dataForm.speciality = arrSpecialities[0];
    let professionalsArrDesc
    if(professionalsDesc !== undefined)
      professionalsArrDesc = professionalsDesc.split(",");

    if(arrProfessionals !== null && !this.isWaitingListEditing){
      let procedures = this.dataForm.procedureMedic.split(",");
      arrProfessionals.forEach((professional, index) => {
        let professionalItem = {
          idDTO: professional.trim(),
          especialidadIdDTO: arrSpecialities[index].trim(),
          procedimientoIdDTO: procedures.length > 1 ? procedures[index].trim(): this.dataForm.procedureMedic,
          descripcionDTO: professionalsDesc !== undefined ? professionalsArrDesc[index].trim(): "",
        }
        this.dataForm.professional.push(professionalItem);
      });
    }    
  }

  getMedicalSpecialities(specialityId?: string): void{
    this.servicegeneric.GetMedicalSpeciality().subscribe(resp => {
      if(this.isWaitingListEditing){
        let specialities = [];
        specialityId.split(",").forEach(speciality => {
          specialities.push(resp.result.find(spc => spc.idDTO === speciality.trim()));  
        })
        this.specialtyList = specialities;
      } else
        this.specialtyList = resp.result;

      //Se verifica que el tipo de cita no sea de multiple selección
      let condition = this.dataForm.appointmentTypeCode === APPOINTMENTTYPES.MEDICALBOARD ||
        this.dataForm.appointmentTypeCode === APPOINTMENTTYPES.MULTIPLE;

      //Se verifica que se esté editando listas de espera y que el tipo de cita sea de multiple selección, para habilitar campo de especialidad.
      condition = this.isWaitingListEditing && condition ? condition = true : condition = false;

      this.specialityConfig = {
        dataSource: this.specialtyList,
        displayExpr: 'descripcionDTO',
        valueExpr: 'idDTO',
        // disabled: this.isRescheduling && (!this.isWaitingListEditing && !isMultiple),
        disabled: this.isRescheduling && !condition,
        onSelectionChanged: (e) => this.onchangedValueSpeciality(e)
      }
    });
  }

  onchangedValueSpeciality(e): void {
    if(e.selectedItem !== null && this.isWaitingListEditing){
      let isMedicalBoard = APPOINTMENTTYPES.MEDICALBOARD === this.dataForm.appointmentTypeCode ? true:false;
      this.servicegeneric.GetMedicalProceduresInterconsulting(e.selectedItem.idDTO, isMedicalBoard).subscribe(res => {
        this.procedureList = res;
        let selectedSpecialityIndex = this.scheduledAppointment.especialidadId.split(",").findIndex(x => x.trim() === this.dataForm.speciality)
        
        if(selectedSpecialityIndex >= 0){
          this.dataForm.procedureMedic = this.scheduledAppointment.procedimientoId.split(",")[selectedSpecialityIndex].trim();
          this.getProfessionals(this.dataForm.speciality, this.scheduledAppointment.especialidad);
        }
      });            
    } else if(e.selectedItem !== null && !this.isRescheduling){
      this.dataForm.procedureMedic = "";
      let isMedicalBoard = APPOINTMENTTYPES.MEDICALBOARD === this.dataForm.appointmentTypeCode ? true:false;
      this.servicegeneric.GetMedicalProceduresInterconsulting(e.selectedItem.idDTO, isMedicalBoard).subscribe(res => this.procedureList = res);
      this.scheduledAppointment.especialidad = e.selectedItem.descripcionDTO;
    }
  }

  getAppointmentTypes(appointmentTypesResult): void{
    this.appointmentTypeList = appointmentTypesResult.result;
    this.appointmentTypeConfig = {
      dataSource: this.appointmentTypeList,
      displayExpr: 'descripcionDTO',
      valueExpr: 'idDTO',
      disabled: this.isRescheduling,
      onValueChanged: (e) => this.onAppointmentTypeChanged(e),
    }
    if(this.idAppointment) {
      const appointmentType = appointmentTypesResult.result.find(appType => appType.idDTO === this.dataForm.appointmentTypeId);
      this.dataForm.appointmentTypeCode = appointmentType.codigo;
    }
  }

  onAppointmentTypeChanged(e){
      if(e.value){
        let appointmentType = this.appointmentTypeList.find(tc => tc.idDTO == e.value);
        this.scheduledAppointment.tipoCita = appointmentType.descripcionDTO;
        
        if(!this.isRescheduling) {
          this.cleanForm();
        }
        
        this.dataForm.appointmentTypeCode = appointmentType.codigo;
        this.dataForm.appointmentTypeId = e.value;

        this.checkAppointmentType(false);
        this.cleanProfessionalFilter();
        
        if(!this.isRescheduling){
          this.specialityConfig = {
            ...this.specialityConfig,
            disabled: this.dataForm.appointmentTypeCode === this.appointmentTypesEnum.PROGRAM
          }
        }
      }
      if(this.dataForm.appointmentTypeCode !== this.appointmentTypesEnum.PROGRAM){
        this.activitiesList = new Array();
      }
      this.procedureList = new Array<any>();
  }

  cleanProfessionalFilter(): void{
    this.tagBox.instance.reset();
    this.dataForm.professional = [];
    this.selectedProfessionals.professionals = ""
    this.selectedProfessionals.specialities = ""
    this.tagBox.isValid = true;
  }

  onFocusedRowChanged(e): void {
    this.popupVisible = true;
    this.selectedIndividualAppointment = e;
    this.selectedIndividualAppointment.tipoCita = this.appointmentTypeList.find(r => r.idDTO === this.dataForm.appointmentTypeId).descripcionDTO;
  }

  onFocusedRowChanging(e): void {
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

  searchIndividualAppointment(): void{
    const isIndividual = this.dataForm.appointmentTypeCode == this.appointmentTypesEnum.GENERAL || this.dataForm.appointmentTypeCode == this.appointmentTypesEnum.SPECIALISTAPPOINTMENT

    if(!isIndividual){
      this.sharedService.error("El tipo de cita no es válido.");
      return;
    }

    const speciality = this.selectedProfessionals.specialities ? this.selectedProfessionals.specialities : this.dataForm.speciality;
    const individualAppointment = {
      idTipoCita: this.dataForm.appointmentTypeId,
      professional: this.selectedProfessionals.professionals,
      specialty: speciality,
      process: this.dataForm.procedureMedic,
      date: this.dataForm.date,
      campus: this.dataForm.headquarter
    }

    this.appointmentService.SearchAppointments(individualAppointment).subscribe(rest => {
      if (rest.length === 0) {
        this.gridData = [];
        this.waitingList();
      } else {
        this.gridData = rest;
        this.translateService.get('particularAppointments.message.successAppointmentGet', 
                            { appointments: rest.length, professional: this.concatItems("descripcionDTO") }).subscribe((succesMessage:string) => {
          this.sharedService.success(succesMessage);
        });
      }
    })
  }

  searchAppointments(): void {
    if (!this.form.instance.validate().isValid)
      return;

    let isMedicalBoard = this.dataForm.appointmentTypeCode == this.appointmentTypesEnum.MEDICALBOARD ? true : false;
    if(isMedicalBoard){
      
      
      this.tagBox.isValid = this.tagBox.value.length < 2 ? false : true;
      if(this.tagBox.value.length < 2){
        this.sharedService.error(this.translateService.instant("particularAppointments.message.validateMedicalBoardProfessionals"));
        return;
      }
    } else{
      this.tagBox.isValid = true;
    }

    this.dataForm.professional = this.dataForm.professional == null ? [] : this.dataForm.professional;
    this.dataForm.headquarter = this.dataForm.headquarter == '' ? '' : this.dataForm.headquarter;

    if(this.dataForm.date !== '' )
      this.dataForm.date = this.dataForm.date == null ? '' : new Date(this.dataForm.date).toISOString();

    if(this.showCalendar){
      this.checkAppointmentType(true);
    } else {
      this.searchIndividualAppointment();
    }
    
  }

  click(e): void {
    this.popupVisible = false;
  }

  concatItems(field: string): string {
    let arrangedItemsByComma = "";
    if(this.dataForm.professional){
      this.dataForm.professional.forEach((professional, index) => {
        arrangedItemsByComma += (index+1) === this.dataForm.professional.length ? `${professional[field]}`:`${professional[field]},`
      });
    }
    return arrangedItemsByComma;
  }

  cleanForm(){
    this.dataForm = this.initializeDataForm();
    this.selectedProfessionals = {
      professionals: "",
      specialities: "",
      procedure: ""
    };
    this.dataForm.professional = null;
  }

  waitingList(): void {
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
            this.isVisibleWaitingList = true;
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

  addWaitingList(): void {
    this.dataFrm = {
      appointmentTypeId: this.dataForm.appointmentTypeId,
      appointmentTypeCode: this.dataForm.appointmentTypeCode,
      speciality: this.selectedProfessionals.specialities == "" ? this.dataForm.speciality : this.selectedProfessionals.specialities,
      procedure: this.dataForm.procedure == "" ? this.scheduledAppointment.procedimiento : this.dataForm.procedure,
      procedureMedic: this.selectedProfessionals.procedure == "" ? this.dataForm.procedureMedic : this.selectedProfessionals.procedure,
      headquarter: this.dataForm.headquarter,
      program: this.dataForm.program,
      activity: this.dataForm.activity
    };
    
    let multipleSpecialities = this.isRescheduling ? this.scheduledAppointment.especialidad:  this.concatItems("especialidadDTO");

    if(multipleSpecialities !== ""){
      this.scheduledAppointment.especialidad = multipleSpecialities;
    }
  }

  onTabChanged(e): void{
    switch(e.icon){
      case "fas fa-table":
        if(!this.isRescheduling && this.showCalendar){
          this.cleanForm();
          this.cleanProfessionalFilter();
          this.gridData = [];
          this.schedulerFrameUrl = '';
        }
        this.showCalendar = false;
      break;
      case "fas fa-calendar-alt":
        if(!this.isRescheduling && !this.showCalendar){
          this.cleanForm();
          this.cleanProfessionalFilter();
          this.checkAppointmentType(true);
        }
        this.showCalendar = true;
      break;
    }
  }

  onProcedureChange = (data): void => {
    if(!this.isRescheduling && this.dataForm.speciality !== ""){
      this.scheduledAppointment.procedimiento = data.element.textContent;
      this.getProfessionals(this.dataForm.speciality, this.scheduledAppointment.especialidad);
    }
  }

  onHeadquarterChange = (): void => {
    if(this.dataForm.speciality !== ""){
      this.getProfessionals(this.dataForm.speciality, this.scheduledAppointment.especialidad);
    }
  }

  onProfessionalValueChanged(e): void {
    if(e.previousValue.length > e.value.length){
      this.dataForm.professional = e.value;
      return;
    }

    if(e.value.length){
      this.tagBox.isValid = !this.tagBox.value.length ? false : true;
      
      const maxItems = 1;
      let professionalIsSelected = false;
      if(e.previousValue.length !== e.value.length)
        professionalIsSelected = this.dataForm.professional.some(x => x.idDTO == e.value[e.value.length - 1].idDTO);
      
      if(professionalIsSelected){
        const newValue = e.value.slice(0, e.value.length - 1);
        e.component.option("value", newValue);
        this.dataForm.professional = newValue; 
      }

      //Se valida que cuando hay selección unica para profesionales, no se agreguen más de uno.
      if (e.value.length > maxItems && !this.multipleSelection) {
        const newValue = e.value.slice(0, maxItems);
        e.component.option("value", newValue);
        this.dataForm.professional = newValue; 
      } else {
        this.dataForm.professional = e.value;
      }
      
      if(this.dataForm.professional.length){
        let lastIndex = this.dataForm.professional.length - 1;
        
        this.dataForm.professional[lastIndex].procedimientoIdDTO = this.dataForm.procedureMedic;
      }
      this.dataForm.procedure == "" ? this.dataForm.procedure = this.scheduledAppointment.procedimiento : this.dataForm.procedure += "\n "+this.scheduledAppointment.procedimiento;
      
      this.selectedProfessionals.professionals = this.concatItems("idDTO");
      this.selectedProfessionals.specialities = this.concatItems("especialidadIdDTO");
      this.selectedProfessionals.procedure = this.concatItems("procedimientoIdDTO");
    }
  }
    
  saveAppointment(e): void {
    let appointmentSave = {
      autorizacionAsegurador: null,
      detalleProcedimientoAgenda: this.dataForm.procedureMedic,
      especialidadMedica: this.dataForm.speciality,
      fechaCita: this.selectedIndividualAppointment.fecha,
      horaCita: this.selectedIndividualAppointment.hora,
      id: (this.idAppointment != null || this.idAppointment != undefined) ? this.idAppointment : null,
      idProfesional: this.professionalList.find(r => r.descripcionDTO == this.selectedIndividualAppointment.profesional).idDTO,
      persona: this.scheduledAppointment.personaId,
      tipoCita: this.dataForm.appointmentTypeId,
      instalacionPrestador: this.campusList.find(r => r.descriptionDTO == this.selectedIndividualAppointment.sede).idDTO,
      opheliaUser: this.sessionService.session.accountCode
    }
    let resultExecute;
    this.appointmentService.SaveAppointment(appointmentSave).subscribe(rest => {
      if (rest.isSuccessful) {
        this.router.navigate(['/appointment-management/listar-citas'], { queryParams: { selfmanagement: this._getValSeflManagement() }});
      } else {
        this.sharedService.error(rest.messages);
      }
      resultExecute = rest;
    });
  }

  clearCalendar(): Promise<any>{
    return new Promise(resolve => {
      this.schedulerFrameUrl = "";
      this.sharedService.showLoader(true);
      setTimeout(() => {

        resolve();
      }, 500);
    });
  }

  checkAppointmentType = (updateCalendar:boolean): void => {
    const CALENDAR = CALENDARS.find(calendar => calendar.CODE === this.dataForm.appointmentTypeCode);
    if(updateCalendar){
      this.clearCalendar().then(e => {
        this.schedulerFrameUrl = `${this.urlApi}?calendarioId=${CALENDAR ? CALENDAR.CALENDAR_ID : DEFAULT_CALENDAR}${CALENDAR ? this.getCalendarParams(): ''}`;
        this.sharedService.showLoader(false);
      })
    } 

    if(CALENDAR !== undefined)
      this.multipleSelection = CALENDAR.IS_MULTIPLE_SELECTION;
    
    
    if(updateCalendar){
    if(this.schedulerFrameUrl !== `${this.urlApi}?calendarioId=${DEFAULT_CALENDAR}`)
      this.sharedService.success("Calendario Actualizado")
    }
  }

  getCalendarParams(): string { 
    const rescheduling = (this.idAppointment !== null) ? `&idCitaReprograma=${this.idAppointment}` : "" ;
    const activity = (this.dataForm.activity !== '') ? `&activityId=${this.dataForm.activity}` : "" ;
    const waitingList = this.isWaitingListEditing ? `&idWaiting=${this.idAppointment}` : "" ;
    const procedure = this.selectedProfessionals.procedure == "" || this.dataForm.appointmentTypeCode === APPOINTMENTTYPES.MEDICALBOARD ? this.dataForm.procedureMedic : this.selectedProfessionals.procedure;
    let speciality = this.selectedProfessionals.specialities ? this.selectedProfessionals.specialities : this.dataForm.speciality;

    if(this.dataForm.appointmentTypeCode === APPOINTMENTTYPES.PROGRAM){
      speciality = ""
    }

    return "&professionals="+ this.selectedProfessionals.professionals +
    "&specialties=" + speciality +
    "&process="+ procedure +
    "&date="+ this.dataForm.date +
    "&campus="+ this.dataForm.headquarter +
    "&patient="+ this.scheduledAppointment.personaId +
    "&scheduler="+ this.sessionService.session.accountCode +
    "&appointmentType="+ this.dataForm.appointmentTypeId + 
    rescheduling + waitingList + activity;
  }

  onWaitingListBtnClick(e): void {
    const valid = this.form.instance.validate();
    if (valid.isValid){
      this.addWaitingList()
      this.isVisibleWaitingList = true;
    }
  }

  onProgramChanged = (e): void => {
    if(e.selectedItem){
      const program = e.selectedItem.idDTO;
      this.dataFrm.program = e.selectedItem.idDTO;
      this.scheduledAppointment.programa = e.selectedItem.descripcionDTO;
      this.activitiesList = [];
      
      if(!this.isRescheduling)
        this.dataForm.activity = '';


      this.particularAppointmentsService.GetActivitiesByProgram(program).subscribe(res => {
        this.activitiesList = res;
      });
    }
  }

  onActivityChanged = (e) =>{
    if(e.selectedItem){
      this.dataFrm.activity = e.selectedItem.idDTO;
      this.scheduledAppointment.actividad = e.selectedItem.descripcionDTO;
      this.getProfessionals("","")
    }
  }

  getProfessionals(specialityId: string, specialityName: string): void{
    if(this.dataForm.appointmentTypeId !== ""){
      this.servicegeneric.GetProfessionalsWithAvaliableShedule(specialityId, this.dataForm.appointmentTypeId, this.dataForm.procedureMedic, this.dataFrm.activity, this.dataForm.headquarter).subscribe(resp => {
        if (resp.result) {
          this.professionalList = [];
          for (let index = 0; index < resp.result.length; index++) {
            const element = resp.result[index];
            if (element) {
              let profesional = {
                idDTO: element.idDTO,
                descripcionDTO: element.descripcionDTO,
                estadoDTO: true,
                especialidadDTO: specialityName,
                especialidadIdDTO: specialityId,
              };
              this.professionalList.push(profesional)
            }
          }
        }
      })
    }
  }

  goBack(): void {
    this.router.navigate(['/appointment-management/listar-citas'], { queryParams: {selfmanagement: this._getValSeflManagement()} });
  }

  onResult = (show: boolean): void => {
    if (!show)
      this.isVisibleWaitingList = false;
  }

  ngOnDestroy(): void {
    this.patientInfoSubs.unsubscribe();
  }

  private _validateSelFmanagement(){
    this.activatedRoute.queryParams.subscribe(
      params => (this.selfmanagement = params['selfmanagement'] === EnumsSelfManagement.TYPE_OK));
  }

  private _getValSeflManagement = () => this.selfmanagement ? EnumsSelfManagement.TYPE_OK : EnumsSelfManagement.TYPE_BAD;

}
