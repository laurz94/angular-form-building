import { CommonModule } from '@angular/common';
import { Component, input, Optional, Self, OnInit, EventEmitter, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { BaseFieldConfiguration } from '@libs/domain';

@Component({
  selector: 'lib-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <textarea
    [id]="config()?.inputId"
    [(ngModel)]="value"
    (blur)="onBlur()"
    (change)="onChange()"
    (focus)="onFocus()"
    (input)="onInput()"
  ></textarea>`,
})
export class TextareaComponent implements ControlValueAccessor, OnInit {
  config = input<BaseFieldConfiguration>();
  disabled = input(false);

  @Output() blurred = new EventEmitter();
  @Output() changed = new EventEmitter<string | undefined>();
  @Output() focused = new EventEmitter();
  @Output() keyPressed = new EventEmitter<string>();

  value?: string;
  // disabled = false;
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

  onChange(): void {
    this.onChanged(this.value);
    this.changed.emit(this.value);
  }

  onInput(): void {
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
    this.value = value;
  }
}
