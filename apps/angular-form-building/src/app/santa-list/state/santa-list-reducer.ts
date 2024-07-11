import { LoadingStatus, setStatePropertyErrored, setStatePropertyLoaded, setStatePropertyLoading } from '@libs/domain';
import { createReducer, on } from '@ngrx/store';

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
    people: {
      ...state.people,
      status: LoadingStatus.saved,
      value: state.people.value!.map((p) => (p.id === person.id ? { ...person } : { ...p })),
    },
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
    addresses: {
      ...state.addresses,
      status: LoadingStatus.saved,
      value: state.addresses.value!.map((a) => (a.id === address.id ? { ...address } : { ...a })),
    },
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
    contacts: {
      ...state.contacts,
      status: LoadingStatus.saved,
      value: state.contacts.value!.map((c) => (c.id === contact.id ? { ...contact } : { ...c })),
    },
  }))
);
