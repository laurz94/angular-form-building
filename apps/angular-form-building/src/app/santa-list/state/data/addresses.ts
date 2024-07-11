import { fakerEN as faker } from '@faker-js/faker';

import { Address } from '../../models/address';

export function getAddresses(): Address[] {
  const addresses = [];

  for (let i = 1; i <= 25; i++) {
    const address: Address = {
      personId: i,
      id: i,
      addressLine1: faker.location.streetAddress(),
      addressLine2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      hasChimney: faker.datatype.boolean(),
    };

    addresses.push(address);
  }

  return addresses;
}
