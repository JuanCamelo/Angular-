import { createReducer, on, Action } from '@ngrx/store';
import * as reduxActions from '../actions';
import { Example } from 'src/app/models/example';

const initialState = new Example();

const setExampleReducer = createReducer(
    initialState,
    on(
        reduxActions.setExample, (state, { example: example }) => ({
            ...state,
            ...example
        })
    )
);

export function exampleReducer(state: Example, action: Action) {
    return setExampleReducer(state, action);
}
