import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { concatMap, filter, map } from 'rxjs';

import { getAddresses, getContacts, getPeople } from './data';
import { SantaListActions } from './santa-list-actions';
import { selectStateProperty } from './santa-list-selectors';

@Injectable()
export class SantaListEffects {
  #actions$ = inject(Actions);
  #store = inject(Store);

  loadData$ = createEffect(() =>
    this.#actions$.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      concatLatestFrom(() => this.#store.select(selectStateProperty('people'))),
      filter(([_action, people]) => !people?.length),
      concatMap(() => {
        return [SantaListActions.loadAddresses(), SantaListActions.loadContacts(), SantaListActions.loadList()];
      })
    )
  );

  loadPeople$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(SantaListActions.loadList),
      map(() => SantaListActions.loadListSuccess({ list: getPeople() }))
    )
  );
  loadAddresses$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(SantaListActions.loadAddresses),
      map(() => SantaListActions.loadAddressesSuccess({ list: getAddresses() }))
    )
  );
  loadContacts$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(SantaListActions.loadContacts),
      map(() => SantaListActions.loadContactsSuccess({ list: getContacts() }))
    )
  );
}
