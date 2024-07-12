import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Address } from '../../models/address';

export const AddressActions = createActionGroup({
  source: 'Address',
  events: {
    'Load Addresses': emptyProps(),
    'Load Addresses Success': props<{ addresses: Address[] }>(),
    'Load Addresses Failure': props<{ error: Error }>(),
    'Update Address': props<{ address: Address }>(),
  },
});
