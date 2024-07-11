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
