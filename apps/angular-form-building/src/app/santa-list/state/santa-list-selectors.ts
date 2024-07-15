import { LoadingStatus, StateProperty } from '@libs/domain';
import { createSelector } from '@ngrx/store';

import { AppState } from '../../app.config';
import { Contact } from '../models/contact';
import { Person } from '../models/person';

import { santaListFeatureKey, SantaListState } from './santa-list-state';

export const selectListState = (state: AppState) => state[santaListFeatureKey];

export const selectStateProperty = (property: string, filter?: (x: any) => boolean) =>
  createSelector(selectListState, (state: SantaListState) => {
    const stateProp: StateProperty<any> = { ...(state as any)[property] };

    if (Array.isArray(stateProp.value) && filter) {
      stateProp.value = stateProp.value.filter(filter);
    }

    return stateProp.value;
  });

export const selectStatePropertySingleValue = (property: string, find: (x: any) => boolean) =>
  createSelector(selectListState, (state: SantaListState) => {
    const stateProp: StateProperty<any> = { ...(state as any)[property] };

    if (Array.isArray(stateProp.value) && find) {
      stateProp.value = stateProp.value.find(find);
    }

    return stateProp.value;
  });

export const selectStatePropertyIsLoaded = (property: string) =>
  createSelector(selectListState, (state: SantaListState) => {
    const stateProp: StateProperty<any> = { ...(state as any)[property] };

    return stateProp.status === LoadingStatus.loaded || LoadingStatus.saved;
  });

export const selectParents = (personId: number) =>
  createSelector(selectStateProperty('people'), (people: Person[]) => {
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
