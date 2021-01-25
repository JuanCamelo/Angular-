import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionDTO } from 'src/app/models/Collection';
import { GenericsService } from 'src/app/services/generic.service';
import { AppState } from 'src/app/store/app.reducers';
import { selectPatientInfo } from 'src/app/store/selector/patient-info.selector';
import { AppointmentState } from '../../../models/appointment-state';
import { AppointmentManagementService } from '../services/appointment-management.service';
import { HistoryMedicalAppoimentDTO, HistoryMedicalAppoimentFilter } from './models/history-medical-appoiment';
import { isPatientInfoLoaded } from '../../../store/actions/patient-info.action';

@Component({
  selector: 'oph-history-medical-appointments',
  templateUrl: './history-medical-appointments.component.html',
  styleUrls: ['./history-medical-appointments.component.css']
})
export class HistoryMedicalAppointmentsComponent implements OnInit {

  @Input() isVisibleInfoPatient = true;
  gridData: HistoryMedicalAppoimentDTO[];
  DataForm: HistoryMedicalAppoimentFilter = {
    idPersonaDTO: '',
    estadoCitaDTO: '',
    especialidadDTO: '',
    instalacionPrestadorDTO: '',
    fechaInicialDTO: new Date(),
    fechaFinalDTO: new Date(),
  };
  Max: Date = new Date();
  Min: Date = new Date();
  $StateList: Observable<Array<AppointmentState>>;
  $SpecialtyList: Observable<Array<any>>;
  $CampusList: Observable<Array<CollectionDTO>>;
  History: Array<HistoryMedicalAppoimentDTO>;
  constructor(
    private store: Store<AppState>,
    private appointmentManagService: AppointmentManagementService,
    private genericService: GenericsService
  ) {
    this.DataForm.fechaInicialDTO = this.GetInitialDate();
    this.Min = this.GetMinDate();
    this.Max = this.GetMaxDate();
  }

  ngOnInit() {
    this.InitializeData();
    this.GetIdApointment();
  }

  InitializeData() {
    this.store.dispatch(isPatientInfoLoaded());
    this.$CampusList = this.appointmentManagService.GetHeadquarters();
    this.$StateList = this.appointmentManagService.GetAllappointmentStatus();
    this.$SpecialtyList = this.genericService.GetMedicalSpeciality().pipe(map(res => res.result));
  }

  GetProcedureHistory() {
    this.appointmentManagService.GetAppointmentHistory(this.DataForm)
      .subscribe(res => this.History = res);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.GetProcedureHistory();
  }

  GetIdApointment() {
    this.store.select(selectPatientInfo).subscribe(p => {
      if (p) {
        this.DataForm.idPersonaDTO = p.personId;
        this.GetProcedureHistory();
      }
    })
  }


  GetInitialDate = (): Date => {
    let date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date;
  }

  GetMaxDate = (): Date => {
    let date = new Date();
    date.setMonth(date.getMonth() + 12);
    return date;
  }

  GetMinDate = (): Date => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 100);
    return date;
  }


}
