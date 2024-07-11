import { BaseFieldConfiguration } from './base-field-configuration';
import { SelectOption } from './select-option';

export interface SelectConfiguration extends BaseFieldConfiguration {
  options: SelectOption[];
}
