import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Address } from '../models/address';
import { Contact } from '../models/contact';
import { Person } from '../models/person';

export const SantaListActions = createActionGroup({
  source: 'Santa List',
  events: {
    'Load List': emptyProps(),
    'Load List Success': props<{ list: Person[] }>(),
    'Load List Failure': props<{ error: Error }>(),

    'Load Addresses': emptyProps(),
    'Load Addresses Success': props<{ list: Address[] }>(),
    'Load Addresses Failure': props<{ error: Error }>(),

    'Load Contacts': emptyProps(),
    'Load Contacts Success': props<{ list: Contact[] }>(),
    'Load Contacts Failure': props<{ error: Error }>(),

    'Update Address': props<{ address: Address }>(),
    'Update Contact': props<{ contact: Contact }>(),
    'Update Person': props<{ person: Person }>(),
  },
});
