import { BaseFieldConfiguration } from './base-field-configuration';

export interface CheckboxConfiguration extends BaseFieldConfiguration {
  options: CheckboxOption[];
}

export interface CheckboxOption {
  label: string;
  value: string | boolean | number;
}
