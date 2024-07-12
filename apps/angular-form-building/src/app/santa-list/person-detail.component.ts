import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentComponent, ContentConfiguration, fadeInListAnimation, FieldComponent } from '@libs/components';
import { Store } from '@ngrx/store';

import { Address } from './models/address';
import { Contact } from './models/contact';
import { Person } from './models/person';
import {
  getAddressDetailConfiguration,
  getContactDetailConfiguration,
  getPersonDetailConfiguration,
  getPersonDetailFormGroup,
} from './person-detail.configuration';
import { AddressActions } from './state/address-store/address.actions';
import { selectAddressByPerson } from './state/address-store/address.selectors';
import { ContactsActions } from './state/contacts-store/contacts.actions';
import { selectContactByPerson } from './state/contacts-store/contacts.selectors';
import { PeopleActions } from './state/people-store/people.actions';
import { selectPeopleStatus, selectPerson } from './state/people-store/people.selectors';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContentComponent, FieldComponent],
  animations: [fadeInListAnimation],
  styles: `
  .person {
    border: 1px lightgrey solid;
    border-radius: 6px;
    padding: 0.5rem;
  }
  .field-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0.25rem;
    gap: 1rem;
  }
  `,
  template: `
    <div class="page">
      @if(isLoaded()){
      <div class="person">
        @if(person() && formGroup.value){
        <h2 [style]="'color: ' + person()!.favoriteColor">
          {{ person()!.firstName }} {{ person()!.lastName }}
          <span class="material-symbols-outlined" [ngClass]="person()!.isNaughty ? 'naughty' : 'nice'">
            {{ person()!.isNaughty ? 'sentiment_extremely_dissatisfied' : 'sentiment_excited' }}
          </span>
        </h2>
        <lib-content
          [data]="person()"
          [configurations]="personConfigs()"
          layout="two-column"
          (dataChanged)="updateState($event, 'person')"
        ></lib-content>
        <h3>
          <span>Address</span>
          @if(address()?.hasChimney){
          <span class="material-symbols-outlined roofing">roofing</span>
          }
        </h3>
        <lib-content
          [data]="address()"
          [configurations]="addressConfigs"
          layout="two-column"
          (dataChanged)="updateState($event, 'address')"
        ></lib-content>

        <h3>Contact Information</h3>
        <lib-content
          [data]="contact()"
          [configurations]="contactConfigs"
          layout="three-column"
          (dataChanged)="updateState($event, 'contact')"
        ></lib-content>
        }
      </div>
      } @else {
      <div>Loading...</div>
      }
    </div>
  `,
})
export class PersonDetailComponent {
  #store = inject(Store);

  isLoaded = this.#store.selectSignal(selectPeopleStatus);
  address: Signal<Address | undefined> = this.#store.selectSignal(selectAddressByPerson(+this.route.snapshot.params['id']));
  contact: Signal<Contact | undefined> = this.#store.selectSignal(selectContactByPerson(+this.route.snapshot.params['id']));
  person: Signal<Person | undefined> = this.#store.selectSignal(selectPerson(+this.route.snapshot.params['id']));

  addressConfigs = getAddressDetailConfiguration();
  contactConfigs = getContactDetailConfiguration();
  personConfigs: WritableSignal<ContentConfiguration>;
  formGroup: FormGroup;

  age = computed(() => {
    if (this.person()) {
      const birthDate = new Date(this.person()!.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      // If birth month hasn't occurred yet this year, or it's the birth month but the day hasn't occurred yet, subtract 1 from age
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age;
    } else {
      return undefined;
    }
  });

  constructor(public route: ActivatedRoute) {
    this.personConfigs = signal(getPersonDetailConfiguration(this.age));

    this.formGroup = getPersonDetailFormGroup(this.person(), this.address(), this.contact());

    effect(() => this.personConfigs.update(() => getPersonDetailConfiguration(this.age)), { allowSignalWrites: true });
  }

  updateState(value: any, stateProp: string) {
    let action: any;
    switch (stateProp) {
      case 'address':
        action = AddressActions.updateAddress;
        break;
      case 'contact':
        action = ContactsActions.updateContacts;
        break;
      case 'person':
        action = PeopleActions.updatePerson;
        break;
      default:
        action = PeopleActions.updatePerson;
        break;
    }

    this.#store.dispatch(action({ [stateProp]: value }));
  }
}
