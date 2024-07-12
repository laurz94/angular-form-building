import { LoadingStatus } from '@libs/domain';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Contact } from '../../models/contact';

import { ContactsActions } from './contacts.actions';
import { ContactsState } from './contacts.state';

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const contactsReducer = createReducer(
  adapter.getInitialState({ status: LoadingStatus.initialized, error: null }),
  on(ContactsActions.loadContacts, (state) => ({
    ...state,
    status: LoadingStatus.loading,
  })),
  on(ContactsActions.loadContactsSuccess, (state, { contacts }) =>
    adapter.addMany(contacts, {
      ...state,
      status: LoadingStatus.loaded,
    })
  ),
  /* on(ContactsActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    status: LoadingStatus.error,
    error: error,
  })), */
  on(ContactsActions.updateContacts, (state, { contact }) =>
    adapter.updateOne(
      { id: contact.id, changes: contact },
      {
        ...state,
        status: LoadingStatus.saved,
      }
    )
  )
);

export const getStatus = (state: ContactsState) => state.status;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of contacts ids
export const selectContactsIds = selectIds;

// select the dictionary of contacts entities
export const selectContactsEntities = selectEntities;

// select the array of contacts
export const selectAllContacts = selectAll;

// select the total contacts count
export const selectContactsTotal = selectTotal;
