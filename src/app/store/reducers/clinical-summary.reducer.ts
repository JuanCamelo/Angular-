import { createReducer, on, Action } from '@ngrx/store';
import * as reduxActions from '../actions';
// import { Example } from 'src/app/models/example';

const initialState = null

const setClinicalSummaryReducer = createReducer(
    initialState,
    on(
        reduxActions.setClinicalSummary, (state, { clinicalSummary: clinicalSummary }) => ({
            ...state,
            ...clinicalSummary
        })
    )
);

export function clinicalSummaryReducer(state: any, action: Action) {
    return setClinicalSummaryReducer(state, action);
}
