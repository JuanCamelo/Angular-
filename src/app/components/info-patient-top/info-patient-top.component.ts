import { GenericsService } from './../../services/generic.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPatientDTO } from 'src/app/models/InfoPatientDTO';
import { isConstructorDeclaration } from 'typescript';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as reduxActions from '../../../app/store/actions';
import { PatienteDTO } from "../../pages/hoapital-pharmacy/models/patientDTO";
import { filter } from 'rxjs/operators';
import { isPatientInfoLoaded } from '../../../app/store/actions';

@Component({
  selector: 'oph-info-patient-top',
  templateUrl: './info-patient-top.component.html',
  styleUrls: ['./info-patient-top.component.scss']
})
export class InfoPatientTopComponent implements OnInit {
  @Input() patient: any[];

  //patient: InfoPatientDTO = new InfoPatientDTO();
  slideshowDelay = 2000;
  constructor( private activateRoute: ActivatedRoute,
    private genericsService: GenericsService, 
    private store: Store<AppState>,
    
    private router: Router) { }

  ngOnInit() {
    // this.activateRoute.queryParams.subscribe(params => {
    //   const documentType = params['documentType'], documentNumber = params['documentNumber']
    //   if (!documentType || !documentNumber) return
    //   this.getPatient(documentType, documentNumber)
    // });
    // this.store.select(state => state.patientInfo).pipe(filter(data => !!data))
    // .subscribe(patientInfo => {
    //   if(patientInfo){
    //     this.patient = patientInfo;
    //   } else {
        
    //   }
    // });
  }

  // getPatient(documentType: string, documentNumber: string) {
  //   this.genericsService.GetInfoPatient(documentType, documentNumber).subscribe(response => {
  //     this.patient = response.result;
  //     this.store.dispatch(reduxActions.setPatientInfo({ patientInfo: this.patient }));

  //   })
  // }
}
