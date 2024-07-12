import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Contact } from '../../models/contact';
import { selectParents } from '../people-store/people.selectors';

import * as fromContacts from './contacts.reducer';
import { contactsFeatureKey, ContactsState } from './contacts.state';

export const selectContactsState = createFeatureSelector<ContactsState>(contactsFeatureKey);

export const selectContactsIds = createSelector(
  selectContactsState,
  fromContacts.selectContactsIds // shorthand for contactsState => fromContacts.selectContactsIds(contactsState)
);
export const selectContactsEntities = createSelector(selectContactsState, fromContacts.selectContactsEntities);
export const selectAllContacts = createSelector(selectContactsState, fromContacts.selectAllContacts);
export const selectContactsTotal = createSelector(selectContactsState, fromContacts.selectContactsTotal);
export const selectContactsStatus = createSelector(selectContactsState, fromContacts.getStatus);

export const selectCurrentContacts = createSelector(
  selectContactsEntities,
  selectContactsStatus,
  (contactsEntities, contactsId) => contactsId && contactsEntities[contactsId]
);

export const selectContactByPerson = (personId: number) =>
  createSelector(selectAllContacts, selectParents(personId), (contacts, { mom, dad }): Contact | undefined => {
    const c = contacts?.find((p) => p.personId === personId);

    return c
      ? {
          ...c,
          motherFirstName: mom?.firstName,
          motherLastName: mom?.lastName,
          fatherFirstName: dad?.firstName,
          fatherLastName: dad?.lastName,
        }
      : undefined;
  });
