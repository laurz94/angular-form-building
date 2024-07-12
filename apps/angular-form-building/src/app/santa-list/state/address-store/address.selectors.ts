import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAddress from './address.reducer';
import { addressesFeatureKey, AddressesState } from './address.state';

export const selectAddressState = createFeatureSelector<AddressesState>(addressesFeatureKey);

export const selectAddressIds = createSelector(
  selectAddressState,
  fromAddress.selectAddressIds // shorthand for addressState => fromAddress.selectAddressIds(addressState)
);
export const selectAddressEntities = createSelector(selectAddressState, fromAddress.selectAddressEntities);
export const selectAllAddresses = createSelector(selectAddressState, fromAddress.selectAllAddress);
export const selectAddressTotal = createSelector(selectAddressState, fromAddress.selectAddressTotal);
export const selectAddressStatus = createSelector(selectAddressState, fromAddress.getStatus);

export const selectCurrentAddress = createSelector(
  selectAddressEntities,
  selectAddressStatus,
  (addressEntities, addressId) => addressId && addressEntities[addressId]
);

export const selectAddressByPerson = (personId: number) =>
  createSelector(selectAllAddresses, (addresses) => addresses?.find((p) => p.personId === personId));
