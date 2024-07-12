import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Contact } from '../../models/contact';

export const ContactsActions = createActionGroup({
  source: 'Contacts',
  events: {
    'Load Contacts': emptyProps(),
    'Load Contacts Success': props<{ contacts: Contact[] }>(),
    'Load Contacts Failure': props<{ error: Error }>(),
    'Update Contacts': props<{ contact: Contact }>(),
  },
});
