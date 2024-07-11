import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { CheckboxConfiguration } from '@libs/domain';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` @for(option of config()!.options; track option.value){
    <div>
      <input
        type="checkbox"
        [id]="config()!.inputId"
        [name]="option.value.toString()"
        class="checkbox"
        [(ngModel)]="value"
        (ngModelChange)="onChange()"
      />
      <label [for]="option.value">{{ option.label }}</label>
    </div>
    }`,
  styles: `.checkbox {
    padding: 0.5rem; margin: 0.25rem; border: 1px solid lightgrey; border-radius: 6px;
  }`,
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  config = input<CheckboxConfiguration>();
  // checked = model(false);
  value!: boolean;
  disabled = input(false);
  control!: AbstractControl | null;

  @Output() blurred = new EventEmitter();
  @Output() changed = new EventEmitter<boolean>();
  @Output() focused = new EventEmitter();

  onChanged: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

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
      }

      this.control?.updateValueAndValidity();
    }
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onFocus() {
    this.focused.emit();
  }

  onBlur() {
    this.onTouched();
    this.blurred.emit();
  }

  onChange() {
    this.onChanged(this.value);
    // console.log('onChange: ', this.value);
    this.changed.emit(this.value);
  }

  writeValue(value: boolean): void {
    // this.checked.set(value ?? !this.checked());
    this.value = !!value;
    // console.log('write: ', this.value);
  }
}
