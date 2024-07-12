import { LoadingStatus } from '@libs/domain';
import { EntityState } from '@ngrx/entity';

import { Contact } from '../../models/contact';

export const contactsFeatureKey = 'contacts';

export interface ContactsState extends EntityState<Contact> {
  status: LoadingStatus;
  error: Error;
}
