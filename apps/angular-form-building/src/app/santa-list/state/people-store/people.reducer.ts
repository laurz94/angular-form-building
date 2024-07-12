import { LoadingStatus } from '@libs/domain';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Person } from '../../models/person';

import { PeopleActions } from './people.actions';
import { PeopleState } from './people.state';

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>();

export const peopleReducer = createReducer(
  adapter.getInitialState({ status: LoadingStatus.initialized, error: null }),
  on(PeopleActions.loadPeople, (state) => ({
    ...state,
    status: LoadingStatus.loading,
  })),
  on(PeopleActions.loadPeopleSuccess, (state, { people }) =>
    adapter.addMany(people, {
      ...state,
      status: LoadingStatus.loaded,
    })
  ),
  /* on(PeopleActions.loadPeopleFailure, (state, { error }) => ({
    ...state,
    status: LoadingStatus.error,
    error: error,
  })), */
  on(PeopleActions.updatePerson, (state, { person }) =>
    adapter.updateOne(
      { id: person.id, changes: person },
      {
        ...state,
        status: LoadingStatus.saved,
      }
    )
  )
);

export const getStatus = (state: PeopleState) => state.status;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of people ids
export const selectPeopleIds = selectIds;

// select the dictionary of people entities
export const selectPeopleEntities = selectEntities;

// select the array of people
export const selectAllPeople = selectAll;

// select the total people count
export const selectPeopleTotal = selectTotal;
