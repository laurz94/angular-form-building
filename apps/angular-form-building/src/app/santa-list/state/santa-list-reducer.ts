import { setStatePropertyErrored, setStatePropertyLoaded, setStatePropertyLoading, updateValueById } from '@libs/domain';
import { createReducer, on } from '@ngrx/store';

import { Address } from '../models/address';
import { Contact } from '../models/contact';
import { Person } from '../models/person';

import { SantaListActions } from './santa-list-actions';
import { initialSantaListState } from './santa-list-state';

export const santaListReducer = createReducer(
  initialSantaListState,
  on(SantaListActions.loadList, (state) => ({
    ...state,
    people: setStatePropertyLoading<Person[]>(),
  })),
  on(SantaListActions.loadListSuccess, (state, { list }) => ({
    ...state,
    people: setStatePropertyLoaded(list),
  })),
  on(SantaListActions.loadListFailure, (state, { error }) => ({
    ...state,
    people: setStatePropertyErrored<Person[]>(error),
  })),
  on(SantaListActions.updatePerson, (state, { person }) => ({
    ...state,
    people: updateValueById<Person>(person, state.people),
  })),

  on(SantaListActions.loadAddresses, (state) => ({
    ...state,
    people: setStatePropertyLoading<Person[]>(),
  })),
  on(SantaListActions.loadAddressesSuccess, (state, { list }) => ({
    ...state,
    addresses: setStatePropertyLoaded(list),
  })),
  on(SantaListActions.loadAddressesFailure, (state, { error }) => ({
    ...state,
    people: setStatePropertyErrored<Person[]>(error),
  })),
  on(SantaListActions.updateAddress, (state, { address }) => ({
    ...state,
    addresses: updateValueById<Address>(address, state.addresses),
  })),

  on(SantaListActions.loadContacts, (state) => ({
    ...state,
    people: setStatePropertyLoading<Person[]>(),
  })),
  on(SantaListActions.loadContactsSuccess, (state, { list }) => ({
    ...state,
    contacts: setStatePropertyLoaded(list),
  })),
  on(SantaListActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    people: setStatePropertyErrored<Person[]>(error),
  })),
  on(SantaListActions.updateContact, (state, { contact }) => ({
    ...state,
    contacts: updateValueById<Contact>(contact, state.contacts),
  }))
);
