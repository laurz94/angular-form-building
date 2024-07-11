import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, RouterState } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app.routes';
import { santaListReducer } from './santa-list/state/santa-list-reducer';
import { santaListFeatureKey, SantaListState } from './santa-list/state/santa-list-state';
import { SantaListEffects } from './santa-list/state/santa-list.effects';

export interface AppState {
  [santaListFeatureKey]: SantaListState;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideEffects([SantaListEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ [santaListFeatureKey]: santaListReducer }),
    provideStoreDevtools({ name: 'Santa List', logOnly: !isDevMode() }),
    provideRouterStore({ routerState: RouterState.Minimal }),
  ],
};
