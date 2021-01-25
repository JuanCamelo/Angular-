import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { GenericsService } from 'src/app/services/generic.service';
import { isPatientInfoLoaded, loadPatientInfo, noAction, setPatientInfo } from '../actions';
import { AppState } from '../app.reducers';
import { selectPatientInfo } from '../selector/patient-info.selector';


@Injectable()
export class PatientInfoEffect {

    constructor(
        private $actions: Actions,
        private store: Store<AppState>,
        private router: ActivatedRoute,
        private genericsService: GenericsService
    ) { }

    $isPatienteInfoLoaded = createEffect(() => this.$actions.pipe(
        ofType(isPatientInfoLoaded),
        concatMap(val =>
            of(val).pipe(
                withLatestFrom(this.store.select(selectPatientInfo))
            )
        ),
        filter(([val, patientInfo]) => patientInfo == undefined || patientInfo == null),
        mergeMap(([val, patientInfo]) => {
            const typeDocument = this.router.snapshot.queryParams.typeDocument;
            const numberDocument = this.router.snapshot.queryParams.numberDocument;
            if (!(typeDocument == undefined || numberDocument == undefined))
                return [loadPatientInfo({ numberDocument, typeDocument })];
            else
                return [noAction()];
        })
    ));

    $loadPatientInfo = createEffect(() => this.$actions.pipe(
        ofType(loadPatientInfo),
        filter(({ typeDocument, numberDocument }) => !(typeDocument == undefined || numberDocument == undefined)),
        mergeMap(({ typeDocument, numberDocument }) =>
            this.genericsService.GetInfoPatient(typeDocument, numberDocument).pipe(
                mergeMap(async (res) => setPatientInfo({ patientInfo: res.result })),
                catchError(_ => of(noAction()))
            )
        )
    ));
}