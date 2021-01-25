import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AppointmentManagementService } from '../services/appointment-management.service';
import { SolicitudCitaEspera } from '../services/models/SolicitudCitaEspera';
import { TranslateService } from '@ngx-translate/core';
import { APPOINTMENTTYPES } from 'src/app/models/enums';

@Component({
  selector: 'oph-confirm-waiting-list',
  templateUrl: './confirm-waiting-list.component.html',
  styleUrls: ['./confirm-waiting-list.component.css']
})
export class ConfirmWaitingListComponent implements OnInit {
  @Output() onResult: EventEmitter<boolean> = new EventEmitter();
  @Input() dataForm: any = {
    appointmentTypeId: "",
    appointmentTypeCode: "",
    speciality: "",
    procedure: '',
    procedureMedic: '',
    headquarter: null,
    program: '',
    activity: ''
  };
  @Input() objectWaitingList: any = {
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
    actividad: '',
    programa: ''
  };

  @Input() professionals;

  date: Date = new Date();
  minDate: Date = new Date();

  appointmentTypesEnum: typeof APPOINTMENTTYPES = APPOINTMENTTYPES;
  
  constructor(private appointmentService: AppointmentManagementService, private sharedService: SharedService, private translateService: TranslateService) { }

  ngOnInit() {
  }

  onClick = (res) => {
    if (res)
      this.prepareToSave(this.date)
    else
      this.onResult.emit(false);
  }

  prepareToSave(date: Date) {
    if (date && this.validate()) {
      const solicitud: SolicitudCitaEspera = {
        TipoDocumento: this.objectWaitingList.tipoDocumentoId,
        NumeroDocumento: this.objectWaitingList.numeroDocumento,
        EspecialidadesMedicas: this.dataForm.speciality,
        FechaDeseada: date.toISOString(),
        ProcedimientosMedicos: this.dataForm.appointmentTypeCode === APPOINTMENTTYPES.MEDICALBOARD ? this.dataForm.procedureMedic.split(",")[0] : this.dataForm.procedureMedic,
        SedeDeseada: this.dataForm.headquarter,
        TipoCita: this.dataForm.appointmentTypeId,
        ActividadId: this.dataForm.activity
      }
      this.appointmentService.SaveRequestWaitingList(solicitud).subscribe(res => {
        if (res === true)
          this.sharedService.success(this.translateService.instant('confirm.waiting.message.saveAppointment'))
        this.onResult.emit(false);
      })
    } else {
      this.onResult.emit(false);
    }
  }

  validate(): boolean {
    if ((!this.dataForm.procedure && !this.dataForm.procedureMedic) && (!this.dataForm.activity)) {
      this.sharedService.warning(this.translateService.instant('confirm.waiting.message.saveAppointment'))
      return;
    }
    if (!this.dataForm.appointmentTypeId) {
      this.sharedService.warning(this.translateService.instant('confirm.waiting.message.validateAppoimentType'))
      return false;
    }
    if (!this.dataForm.speciality && !this.dataForm.program) {
      this.sharedService.warning(this.translateService.instant('confirm.waiting.message.validateProgram'))
      return false;
    }
    return true;
  }
  
}