import { createReducer, on, Action } from '@ngrx/store';
import * as reduxActions from '../actions';

const initialState = null

const setPatientInfoReducer = createReducer(
    initialState,
    on(
        reduxActions.setPatientInfo, (state, { patientInfo: patientInfo }) => ({
            ...state,
            ...patientInfo
        })
    ),
    on(
        reduxActions.quitPatientInfo, (state) => null
    )
);

export function patientInfo(state: any, action: Action) {
    return setPatientInfoReducer(state, action);
}
