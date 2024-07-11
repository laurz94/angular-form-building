import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { SelectConfiguration } from '@libs/domain';

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<select
    [(ngModel)]="value"
    [name]="config()!.name"
    [id]="config()!.inputId"
    (onFocus)="onFocus()"
    (onBlur)="onBlur()"
    (ngModelChange)="onChange()"
  >
    @for(option of config()!.options; track option.value) {
    <option [value]="option.value">{{ option.name }}</option>
    }
  </select>`,
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  config = input<SelectConfiguration>();
  disabled = input(false);
  // value = model('');
  @Output() blurred = new EventEmitter();
  @Output() changed = new EventEmitter<string>();
  @Output() focused = new EventEmitter();

  control!: AbstractControl | null;
  value?: string;

  onChanged = (value?: string) => {};
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

  /*   writeValue(event: any) {
    if (typeof event === 'string') {
      this.value.set(event);
    } else {
      this.value.set(event?.target.value);
    }
  } */

  registerOnChange(onChanged: any): void {
    this.onChanged = onChanged;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  /*   setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  } */

  onFocus() {
    this.focused.emit();
  }

  onBlur() {
    this.onTouched();
    this.blurred.emit();
  }

  onChange() {
    this.onChanged(this.value);
    this.changed.emit(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }
}
