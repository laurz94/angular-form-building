import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPeople from './people.reducer';
import { peopleFeatureKey, PeopleState } from './people.state';

export const selectPeopleState = createFeatureSelector<PeopleState>(peopleFeatureKey);

export const selectPeopleIds = createSelector(
  selectPeopleState,
  fromPeople.selectPeopleIds // shorthand for peopleState => fromPeople.selectPeopleIds(peopleState)
);
export const selectPeopleEntities = createSelector(selectPeopleState, fromPeople.selectPeopleEntities);
export const selectAllPeople = createSelector(selectPeopleState, fromPeople.selectAllPeople);
export const selectPeopleTotal = createSelector(selectPeopleState, fromPeople.selectPeopleTotal);
export const selectPeopleStatus = createSelector(selectPeopleState, fromPeople.getStatus);

export const selectCurrentPeople = createSelector(
  selectPeopleEntities,
  selectPeopleStatus,
  (peopleEntities, peopleId) => peopleId && peopleEntities[peopleId]
);

export const selectPerson = (id: number) =>
  createSelector(selectAllPeople, (people) => {
    return people?.find((p) => p.id === id);
  });

export const selectNiceList = createSelector(selectAllPeople, (people) => people?.filter((p) => !p.isNaughty));
export const selectNaughtyList = createSelector(selectAllPeople, (people) => people?.filter((p) => p.isNaughty));

export const selectParents = (personId: number) =>
  createSelector(selectAllPeople, (people) => {
    const person = people?.find((p) => p.id === personId);
    const mom = people?.find((p) => p.id === person?.motherPersonId);
    const dad = people?.find((p) => p.id === person?.fatherPersonId);

    return { mom, dad };
  });
