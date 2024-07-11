import { LoadingStatus } from '@libs/domain';
import { createSelector } from '@ngrx/store';

import { AppState } from '../../app.config';
import { Contact } from '../models/contact';

import { santaListFeatureKey, SantaListState } from './santa-list-state';

export const selectListState = (state: AppState) => state[santaListFeatureKey];

export const selectSantaList = createSelector(selectListState, (state: SantaListState) => state.people.value);
export const selectNiceList = createSelector(selectSantaList, (people) => people?.filter((p) => !p.isNaughty));
export const selectNaughtyList = createSelector(selectSantaList, (people) => people?.filter((p) => p.isNaughty));

export const selectSantaListLoaded = createSelector(
  selectListState,
  (state: SantaListState) => state.people.status === LoadingStatus.loaded || LoadingStatus.saved
);

export const selectPerson = (id: number) =>
  createSelector(selectSantaList, (people) => {
    return people?.find((p) => p.id === id);
  });

export const selectAddresses = createSelector(selectListState, (state: SantaListState) => state.addresses.value);
export const selectAddress = (id: number) => createSelector(selectAddresses, (address) => address?.find((p) => p.id === id));
export const selectAddressByPerson = (personId: number) =>
  createSelector(selectAddresses, (addresses) => addresses?.find((p) => p.personId === personId));

export const selectParents = (personId: number) =>
  createSelector(selectSantaList, (people) => {
    const person = people?.find((p) => p.id === personId);
    const mom = people?.find((p) => p.id === person?.motherPersonId);
    const dad = people?.find((p) => p.id === person?.fatherPersonId);

    return { mom, dad };
  });

export const selectContacts = createSelector(selectListState, (state: SantaListState) => state.contacts.value);
export const selectContact = (id: number) => createSelector(selectContacts, (contact) => contact?.find((p) => p.id === id));

export const selectContactByPerson = (personId: number) =>
  createSelector(selectContacts, selectParents(personId), (contacts, { mom, dad }): Contact | undefined => {
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
