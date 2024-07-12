import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, RouterState } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app.routes';
import { addressReducer } from './santa-list/state/address-store/address.reducer';
import { addressesFeatureKey, AddressesState } from './santa-list/state/address-store/address.state';
import { contactsReducer } from './santa-list/state/contacts-store/contacts.reducer';
import { contactsFeatureKey, ContactsState } from './santa-list/state/contacts-store/contacts.state';
import { peopleReducer } from './santa-list/state/people-store/people.reducer';
import { peopleFeatureKey, PeopleState } from './santa-list/state/people-store/people.state';
import { SantaListEffects } from './santa-list/state/santa-list.effects';

export interface AppState {
  // [santaListFeatureKey]: SantaListState;
  [addressesFeatureKey]: AddressesState;
  [contactsFeatureKey]: ContactsState;
  [peopleFeatureKey]: PeopleState;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideEffects([SantaListEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ [addressesFeatureKey]: addressReducer, [contactsFeatureKey]: contactsReducer, [peopleFeatureKey]: peopleReducer }),
    provideStoreDevtools({ name: 'Santa List', logOnly: !isDevMode() }),
    provideRouterStore({ routerState: RouterState.Minimal }),
  ],
};
