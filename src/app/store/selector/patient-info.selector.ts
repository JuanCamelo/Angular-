import { createSelector } from "@ngrx/store";
import { AppState } from '../app.reducers';


export const selectPatientInfo = createSelector((s: AppState) => s, s => s.patientInfo)