import { createAction, props } from '@ngrx/store';

export const setClinicalSummary = createAction(
    '[CLINIC_SUMMARY] SET',
    props<{ clinicalSummary: any }>()
);
