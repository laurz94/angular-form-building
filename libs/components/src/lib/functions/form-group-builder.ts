import { Signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ContentConfiguration } from '../controls';

export function buildFormGroup(data: any, config: ContentConfiguration, fields: string[]): FormGroup {
  const formGroup = new FormGroup({});

  fields.forEach((field) => {
    const control = new FormControl(data[field]);

    if (config[field].controlConfig.isDisabled) {
      control.disable();
    }

    formGroup.addControl(`${field}`, control);
  });

  return formGroup;
}

export function getFieldNames(config: Signal<ContentConfiguration>): string[] {
  return Object.keys(config);
}
