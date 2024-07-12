import { LoadingStatus } from '@libs/domain';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Address } from '../../models/address';

import { AddressActions } from './address.actions';
import { AddressesState } from './address.state';

export const adapter: EntityAdapter<Address> = createEntityAdapter<Address>();

export const addressReducer = createReducer(
  adapter.getInitialState({ status: LoadingStatus.initialized, error: null }),
  on(AddressActions.loadAddresses, (state) => ({
    ...state,
    status: LoadingStatus.loading,
  })),
  on(AddressActions.loadAddressesSuccess, (state, { addresses }) =>
    adapter.addMany(addresses, {
      ...state,
      status: LoadingStatus.loaded,
    })
  ),
  /* on(AddressActions.loadAddressFailure, (state, { error }) => ({
    ...state,
    status: LoadingStatus.error,
    error: error,
  })), */
  on(AddressActions.updateAddress, (state, { address }) =>
    adapter.updateOne({ id: address.id, changes: address }, { ...state, status: LoadingStatus.saved })
  )
);

export const getStatus = (state: AddressesState) => state.status;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of address ids
export const selectAddressIds = selectIds;

// select the dictionary of address entities
export const selectAddressEntities = selectEntities;

// select the array of address
export const selectAllAddress = selectAll;

// select the total address count
export const selectAddressTotal = selectTotal;
