import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { BaseFieldConfiguration } from '@libs/domain';

@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<input
    type="date"
    [id]="config()?.inputId"
    [(ngModel)]="value"
    (onBlur)="onBlur()"
    (onFocus)="onFocus()"
    (onInput)="onInput()"
    (ngModelChange)="onChange()"
  />`,
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  config = input<BaseFieldConfiguration>();
  disabled = input(false);
  // value = model('');
  @Output() blurred = new EventEmitter();
  @Output() changed = new EventEmitter<string>();
  @Output() focused = new EventEmitter();

  control!: AbstractControl | null;
  value!: string;

  onChanged = (value: string) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.config()) {
      this.control = this.ngControl?.control;

      if (this.config()!.isRequired) {
        this.control?.addValidators(Validators.required);
        this.control?.updateValueAndValidity();
      }
    }
  }

  registerOnChange(onChanged: any): void {
    this.onChanged = onChanged;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  /*   setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  } */

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
  }

  onFocus() {
    this.focused.emit();
  }

  onBlur() {
    this.onTouched();
    this.onChanged(this.value);
    this.blurred.emit();
  }

  onInput() {
    if (this.value) {
      this.onChanged(this.value);
      this.changed.emit(this.value);
    }
  }

  onChange() {
    this.onChanged(this.value);
    this.onTouched();
    this.changed.emit(this.value);
  }
}
