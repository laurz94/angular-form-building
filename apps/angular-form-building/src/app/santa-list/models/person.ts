export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  favoriteColor: string;
  isNaughty: boolean;
  motherPersonId?: number;
  fatherPersonId?: number;
  age?: number;
}
