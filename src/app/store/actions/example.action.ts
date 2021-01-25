import { createAction, props } from '@ngrx/store';
import { Example } from 'src/app/models/example';

export const setExample = createAction(
    '[EXAMPLE] SET',
    props<{ example: Example }>()
);
