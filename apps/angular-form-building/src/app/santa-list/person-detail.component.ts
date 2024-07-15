import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentComponent, ContentConfiguration, fadeInListAnimation, FieldComponent, capitalizeFirstLetter } from '@libs/components';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { Address } from './models/address';
import { Contact } from './models/contact';
import { Person } from './models/person';
import { getAddressDetailConfiguration, getContactDetailConfiguration, getPersonDetailConfiguration } from './person-detail.configuration';
import { SantaListActions } from './state/santa-list-actions';
import { selectContactByPerson, selectStatePropertyIsLoaded, selectStatePropertySingleValue } from './state/santa-list-selectors';
import { santaListFeatureKey } from './state/santa-list-state';

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
        @if(person()){

        <lib-content
          [routeId]="routeId()"
          [stateFeatureKey]="storeFeatureKey"
          stateProperty="people"
          [configurations]="personConfigs()"
          layout="two-column"
          (dataChanged)="updateState($event, 'person')"
        >
          <h2 ngProjectAs="header" [style]="'color: ' + person()!.favoriteColor">
            {{ person()!.firstName }} {{ person()!.lastName }}
            <span class="material-symbols-outlined" [ngClass]="person()!.isNaughty ? 'naughty' : 'nice'">
              {{ person()!.isNaughty ? 'sentiment_extremely_dissatisfied' : 'sentiment_excited' }}
            </span>
          </h2>
        </lib-content>

        <lib-content
          [routeId]="routeId()"
          [stateFeatureKey]="storeFeatureKey"
          stateProperty="addresses"
          [configurations]="addressConfigs"
          layout="two-column"
          (dataChanged)="updateState($event, 'address')"
        >
          <h3 ngProjectAs="header">
            <span>Address</span>
            @if(address()?.hasChimney){
            <span class="material-symbols-outlined roofing">roofing</span>
            }
          </h3>
        </lib-content>

        <lib-content
          [routeId]="routeId()"
          [stateFeatureKey]="storeFeatureKey"
          stateProperty="contacts"
          [configurations]="contactConfigs"
          layout="three-column"
          (dataChanged)="updateState($event, 'contact')"
        >
          <h3 ngProjectAs="header">Contact Information</h3>
        </lib-content>
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
  storeFeatureKey = santaListFeatureKey;
  routeId = toSignal(this.route.params.pipe(map((p) => +p['id'])));
  isLoaded = this.#store.selectSignal(selectStatePropertyIsLoaded('people'));
  address: Signal<Address | undefined> = this.#store.selectSignal(
    selectStatePropertySingleValue('addresses', (p) => p.id === +this.route.snapshot.params['id'])
  );
  contact: Signal<Contact | undefined> = this.#store.selectSignal(selectContactByPerson(+this.route.snapshot.params['id']));
  person: Signal<Person | undefined> = this.#store.selectSignal(
    selectStatePropertySingleValue('people', (p) => p.id === +this.route.snapshot.params['id'])
  );

  addressConfigs = getAddressDetailConfiguration();
  contactConfigs = getContactDetailConfiguration();
  personConfigs: WritableSignal<ContentConfiguration>;

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
    effect(() => this.personConfigs.update(() => getPersonDetailConfiguration(this.age)), { allowSignalWrites: true });
  }

  updateState(value: any, stateProp: string) {
    this.#store.dispatch((SantaListActions as any)[`update${capitalizeFirstLetter(stateProp)}`]({ [stateProp]: value }));
  }
}
