import { FormControl } from '@angular/forms';
export interface FieldConfiguration<T> {
  controlConfig: T;
  formControlName?: string;
  formControl?: FormControl;
  /**
   * use when you want to use a control without the extra space a label provides
   * does have small padding to separate controls vertically
   */
  hideLabel?: boolean;
  label?: string;
  isReadonly?: boolean;
  hint?: string;
}
export function getDefaultFieldConfiguration(overrides: Partial<FieldConfiguration<any>>): FieldConfiguration<any> {
  if (!overrides?.formControlName && !overrides?.formControl) {
    throw new Error('Neither formControlName nor formControl is not provided for field.');
  }
  if (!overrides?.controlConfig) {
    throw new Error('controlConfig is not provided for field.');
  }

  return Object.assign(
    {
      formControlName: overrides.formControlName,
      formControl: overrides.formControl,
      hideLabel: overrides.hideLabel ?? false,
      controlConfig: { ...overrides.controlConfig },
    },
    overrides
  );
}
