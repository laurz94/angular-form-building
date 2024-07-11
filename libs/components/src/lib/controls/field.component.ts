import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Host, input, OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { ControlTypeEnum, FieldConfiguration } from '@libs/domain';

import { CheckboxOptionPipe } from '../pipes/checkbox-option.pipe';
import { DropdownOptionPipe } from '../pipes/dropdown-option.pipe';

import { CheckboxComponent } from './checkbox.component';
import { DatePickerComponent } from './date-picker.component';
import { NumberComponent } from './number.component';
import { SelectComponent } from './select.component';
import { TextareaComponent } from './textarea.component';
import { TextboxComponent } from './textbox.component';

@Component({
  selector: 'lib-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxComponent,
    DatePickerComponent,
    NumberComponent,
    SelectComponent,
    TextboxComponent,
    TextareaComponent,
    CheckboxOptionPipe,
    DropdownOptionPipe,
  ],
  templateUrl: './field.component.html',
  styles: `
  .field {
    margin-bottom: 0.25rem;
    width: 100%;

  .no-label {
    padding: 0.25rem 0;
  }

  .label {
    color: lightslategrey;
    font-size: 0.75rem;
    // min-height: 24px;
    padding: 0.25rem 0;
  }

  .input-switch-label {
    margin-bottom: 0.25rem;
  }

  .hint {
    padding-left: 1rem;
  }

  .readonly {
    .label {
      color: lightslategrey;
      font-size: 0.75rem;
      margin: 0;
    }

    .p-inputtext {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid lightgrey;
      border-radius: 0;
      min-height: 2.5rem;
    }

    .placeholder {
      color: lightslategrey;
    }

    .readonly-check {
      color: darkturquoise;
      margin: 0.25rem;
      width: 1.25rem;
    }

    .readonly-checkbox-label {
      margin-bottom: 0.25rem;
      margin-top: 0.25rem;
    }
  }
}
  `,
})
export class FieldComponent implements OnInit {
  fieldConfig = input.required<FieldConfiguration<any>>();
  hint = input<string>();
  disabled = input(false);
  isReadonly = input(false);

  @Output() blurred = new EventEmitter();
  @Output() changed = new EventEmitter<any>();
  @Output() focused = new EventEmitter();
  @Output() keyPressed = new EventEmitter<any>();

  controlTypeEnum = ControlTypeEnum;
  formControl!: FormControl;
  controlConfig: any;

  currencyDecimalConfig = '1.2-2';

  constructor(@Host() @Optional() private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    if (!this.fieldConfig()?.formControlName) {
      throw new Error(`Form control name was provided.The control type is ${this.fieldConfig()?.controlConfig?.controlType}`);
    } else {
      this.formControl = this.formGroup.form.get(this.fieldConfig().formControlName!) as FormControl;
    }

    if (!this.formControl) {
      throw new Error(`Unable to find an FormControl for "${this.fieldConfig().formControlName}"`);
    }
    // console.group('field ', this.fieldConfig().formControlName);
    // console.log(this.formControl.value);
    // console.groupEnd();
    if (!this.fieldConfig()?.controlConfig?.controlType) {
      throw new Error(`Control type not provided for "${this.fieldConfig().formControlName}"`);
    }

    this.controlConfig = this.fieldConfig()?.controlConfig;

    switch (this.controlConfig.controlType) {
      case ControlTypeEnum.Currency:
        this.currencyDecimalConfig = `1.${this.controlConfig.decimalPlaces ?? 0}-${this.controlConfig.decimalPlaces ?? 0}`;
        break;
      case ControlTypeEnum.Integer:
        this.currencyDecimalConfig = '1.0-0';
        break;
      case ControlTypeEnum.Decimal:
        this.currencyDecimalConfig = `1.${this.controlConfig.minDecimalPlaces}-${this.controlConfig.maxDecimalPlaces}`;
        break;
      default:
        break;
    }
  }

  onBlurred(): void {
    this.blurred.emit();
  }

  onChanged(value: unknown): void {
    // console.log('field changed: ', value, this.formControl.value);
    this.changed.emit(value);
  }

  onFocused(): void {
    this.focused.emit();
  }

  onInput(value: unknown): void {
    this.keyPressed.emit(value);
  }
}
