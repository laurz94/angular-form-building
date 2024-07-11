import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { BaseFieldConfiguration } from '@libs/domain';

@Component({
  selector: 'lib-textbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<input
    type="text"
    [id]="config()?.inputId"
    [(ngModel)]="value"
    (blur)="onBlur()"
    (change)="onChange()"
    (focus)="onFocus()"
    (input)="onInput()"
  />`,
})
export class TextboxComponent implements ControlValueAccessor, OnInit {
  config = input<BaseFieldConfiguration>();
  disabled = input(false);
  // value = input('');
  value?: string;

  @Output() blurred = new EventEmitter();
  @Output() changed = new EventEmitter<string>();
  @Output() focused = new EventEmitter();
  @Output() keyPressed = new EventEmitter<string>();

  control!: AbstractControl | null;

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
      this.control?.setValue(event);
    } else {
      this.value.set(event?.target.value);
      this.control?.setValue(event?.target.value);
    }
    console.log('writeValue: ', this.control?.value);
  } */

  onChange() {
    this.onChanged(this.value);
    this.changed.emit(this.value);
  }

  onInput() {
    this.onChanged(this.value);
    this.keyPressed.emit(this.value);
  }

  onFocus() {
    this.focused.emit();
  }

  onBlur() {
    this.onTouched();
    this.blurred.emit();
  }

  clear(): void {
    this.value = '';
    this.onChange();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(onChanged: any): void {
    this.onChanged = onChanged;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  /* 
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  } */
}
