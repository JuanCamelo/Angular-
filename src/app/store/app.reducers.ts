import { ActionReducerMap } from '@ngrx/store';
import * as Reducers from './reducers';
import { Example } from '../models/example';
import { PatienteInfo } from "./stateModels/patient-info";

export class AppState {

    example: Example;
    clinicalSummary = null;
    patientInfo: PatienteInfo = null;

    constructor() {
        this.example = new Example();
    }
}

export const appReducers: ActionReducerMap<AppState> = {
    example: Reducers.exampleReducer,
    clinicalSummary: Reducers.clinicalSummaryReducer,
    patientInfo: Reducers.patientInfo
};
