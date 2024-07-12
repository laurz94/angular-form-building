import { LoadingStatus } from '../enums/loading-status.enum';

export interface StateProperty<T> {
  value?: T;
  error?: Error;
  status: LoadingStatus;
}

export function getInitialStateProperty<T>(value?: T): StateProperty<T> {
  return {
    error: undefined,
    value: value ?? undefined,
    status: LoadingStatus.initialized,
  };
}

export function setStatePropertyLoading<T>(value?: T): StateProperty<T> {
  return {
    error: undefined,
    value: value ?? undefined,
    status: LoadingStatus.loading,
  };
}

export function setStatePropertyLoaded<T>(value: T): StateProperty<T> {
  return {
    error: undefined,
    value: value,
    status: LoadingStatus.loaded,
  };
}

export function setStatePropertyErrored<T>(error: any): StateProperty<T> {
  return {
    error: error as Error,
    value: undefined,
    status: LoadingStatus.error,
  };
}

export function setStatePropertySaving<T>(value: T): StateProperty<T> {
  return {
    error: undefined,
    value: value,
    status: LoadingStatus.saving,
  };
}

export function setStatePropertySaved<T>(value: T): StateProperty<T> {
  return {
    error: undefined,
    value: value,
    status: LoadingStatus.saved,
  };
}

/******* Array Functions *******/
/**
 * Adds value to array
 * @param value 
 * @param stateValue 
 * @returns 
 */
export function addValueById<T>(value: T, stateValue: StateProperty<T[]>): StateProperty<T[]> {
  return {
    error: undefined,
    status: LoadingStatus.saved,
    value: stateValue.value ? [...stateValue?.value, value] : [value],
  };
}

/**
 * Removes value from array
 * @param value 
 * @param stateValue 
 * @returns 
 */
export function deleteValueById<T>(value: T, stateValue: StateProperty<T[]>): StateProperty<T[]> {
  return {
    error: undefined,
    status: LoadingStatus.saved,
    value: stateValue.value?.filter((x: any) => (x.id !== (value as any).id)),
  };
}

/**
 * Overwrites the value in the array
 * @param value 
 * @param stateValue 
 * @returns 
 */
export function setValueById<T>(value: T, stateValue: StateProperty<T[]>): StateProperty<T[]> {
  return {
    error: undefined,
    status: LoadingStatus.saved,
    value: stateValue.value?.map((x: any) => (x.id === (value as any).id ? { ...value } : { ...x })),
  };
}

/**
 * Patches the value in the array
 * @param value 
 * @param stateValue 
 * @returns 
 */
export function updateValueById<T>(value: T, stateValue: StateProperty<T[]>): StateProperty<T[]> {
  return {
    error: undefined,
    status: LoadingStatus.saved,
    value: stateValue.value?.map((x: any) => (x.id === (value as any).id ? { ...x, ...value } : { ...x })),
  };
}
