import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Person } from '../../models/person';

export const PeopleActions = createActionGroup({
  source: 'People',
  events: {
    'Load People': emptyProps(),
    'Load People Success': props<{ people: Person[] }>(),
    'Load People Failure': props<{ error: Error }>(),
    'Update Person': props<{ person: Person }>(),
  },
});
