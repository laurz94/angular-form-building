import { fakerEN as faker } from '@faker-js/faker';

import { Contact } from '../../models/contact';

export function getContacts(): Contact[] {
  const contacts: Contact[] = [];

  for (let i = 1; i <= 25; i++) {
    const contact = {
      id: i,
      personId: i,
      motherPhone: faker.phone.number(),
      fatherPhone: faker.phone.number(),
    };

    contacts.push(contact);
  }

  return contacts;
}
