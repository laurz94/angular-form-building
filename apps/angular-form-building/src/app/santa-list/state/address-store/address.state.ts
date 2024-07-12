import { LoadingStatus } from '@libs/domain';
import { EntityState } from '@ngrx/entity';

import { Address } from '../../models/address';

export const addressesFeatureKey = 'addresses';

export interface AddressesState extends EntityState<Address> {
  status: LoadingStatus;
  error: Error;
}
