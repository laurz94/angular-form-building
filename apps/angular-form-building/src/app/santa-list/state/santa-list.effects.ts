import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { concatMap, filter, map } from 'rxjs';

import { AddressActions } from './address-store/address.actions';
import { ContactsActions } from './contacts-store/contacts.actions';
import { getAddresses, getContacts, getPeople } from './data';
import { PeopleActions } from './people-store/people.actions';
import { selectAllPeople } from './people-store/people.selectors';

@Injectable()
export class SantaListEffects {
  #actions$ = inject(Actions);
  #store = inject(Store);

  loadData$ = createEffect(() =>
    this.#actions$.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      concatLatestFrom(() => this.#store.select(selectAllPeople)),
      filter(([_action, people]) => !people?.length),
      concatMap(() => {
        return [AddressActions.loadAddresses(), ContactsActions.loadContacts(), PeopleActions.loadPeople()];
      })
    )
  );

  loadPeople$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(PeopleActions.loadPeople),
      map(() => PeopleActions.loadPeopleSuccess({ people: getPeople() }))
    )
  );
  loadAddresses$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(AddressActions.loadAddresses),
      map(() => AddressActions.loadAddressesSuccess({ addresses: getAddresses() }))
    )
  );
  loadContacts$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(ContactsActions.loadContacts),
      map(() => ContactsActions.loadContactsSuccess({ contacts: getContacts() }))
    )
  );
}
