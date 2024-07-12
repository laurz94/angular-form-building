import { LoadingStatus } from '@libs/domain';
import { EntityState } from '@ngrx/entity';

import { Person } from '../../models/person';

export const peopleFeatureKey = 'people';

export interface PeopleState extends EntityState<Person> {
  status: LoadingStatus;
  error: Error;
}
