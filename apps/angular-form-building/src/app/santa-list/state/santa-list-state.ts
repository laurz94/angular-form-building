import { getInitialStateProperty, StateProperty } from '@libs/domain';

import { Address } from '../models/address';
import { Contact } from '../models/contact';
import { Person } from '../models/person';

export const santaListFeatureKey = 'santaList';

export interface SantaListState {
  addresses: StateProperty<Address[]>;
  contacts: StateProperty<Contact[]>;
  people: StateProperty<Person[]>;
}

export const initialSantaListState = {
  addresses: getInitialStateProperty<Address[]>([]),
  contacts: getInitialStateProperty<Contact[]>([]),
  people: getInitialStateProperty<Person[]>([]),
};
