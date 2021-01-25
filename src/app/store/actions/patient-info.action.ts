import { createAction, props } from '@ngrx/store';

export const setPatientInfo = createAction('[PATIENT_INFO] SET', props<{ patientInfo: any }>());
export const isPatientInfoLoaded = createAction('[PATIENT_INFO] isPatientInfoLoaded');
export const loadPatientInfo = createAction('[PATIENT_INFO] loadPatientInfo', props<{ typeDocument: string, numberDocument: string }>());
export const quitPatientInfo = createAction('[PATIENT_INFO] quitPatientInfo');
export const noAction = createAction('[PATIENT_INFO] noAction');