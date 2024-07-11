import { fakerEN as faker } from '@faker-js/faker';

import { Person } from '../../models/person';

import { colorSelectOptions } from './color-select-options';

export function getPeople(): Person[] {
  function getRandomColor() {
    const colors = colorSelectOptions.map((c) => c.value as string);

    return colors[Math.floor(Math.random() * colors.length)];
  }

  const people: Person[] = [];

  for (let i = 1; i <= 25; i++) {
    const person: Person = {
      id: i,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.past({ years: 50, refDate: new Date() }).toISOString().split('T')[0],
      favoriteColor: getRandomColor(),
      isNaughty: faker.datatype.boolean(),
      motherPersonId: i > 2 ? faker.number.int({ min: 1, max: i - 2 }) : undefined,
      fatherPersonId: i > 2 ? faker.number.int({ min: 1, max: i - 2 }) : undefined,
    };

    // Ensure mother and father are not the same person
    if (person.motherPersonId === person.fatherPersonId) {
      person.fatherPersonId = undefined;
    }

    people.push(person);
  }

  return people;
}
