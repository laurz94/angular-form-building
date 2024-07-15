import { LoadingStatus, StateProperty } from '@libs/domain';
import { createSelector } from '@ngrx/store';

export interface FeatureState {
  [key: string]: StateProperty<any>;
}

export interface AppState {
  [key: string]: FeatureState;
}

export const selectStateSlice = (featureKey: string) => (state: AppState) => state[featureKey];

export const selectStateProperty = (featureKey: string, property: string, filter?: (x: any) => boolean) =>
  createSelector(selectStateSlice(featureKey), (state: any) => {
    const stateProp: StateProperty<any> = { ...(state as any)[property] };

    if (Array.isArray(stateProp.value) && filter) {
      stateProp.value = stateProp.value.filter(filter);
    }

    return stateProp.value;
  });

export const selectStatePropertySingleValue = (featureKey: string, property: string | undefined, find: (x: any) => boolean) =>
  createSelector(selectStateSlice(featureKey), (state: any) => {
    if (property) {
      const stateProp: StateProperty<any> = { ...(state as any)[property] };

      if (Array.isArray(stateProp.value) && find) {
        stateProp.value = stateProp.value.find(find);
      }

      return stateProp.value;
    } else {
      return undefined;
    }
  });

export const selectStatePropertyIsLoaded = (featureKey: string, property: string) =>
  createSelector(selectStateSlice(featureKey), (state: any) => {
    const stateProp: StateProperty<any> = { ...(state as any)[property] };

    return stateProp.status === LoadingStatus.loaded || LoadingStatus.saved;
  });
