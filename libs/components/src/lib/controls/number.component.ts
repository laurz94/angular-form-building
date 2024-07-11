import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { BaseFieldConfiguration } from '@libs/domain';


@Component({
  selector: 'lib-number',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<input
    type="number"
    [id]="config()?.inputId"
    [(ngModel)]="value"
    (blur)="onBlur()"
    (change)="onChange()"
    (focus)="onFocus()"
    (input)="onInput()"
  />`,
})
export class NumberComponent implements ControlValueAccessor, OnInit {
  config = input<BaseFieldConfiguration>();
  disabled = input(false);
  // value = model('');
  value?: number;
  @Output() blurred = new EventEmitter();
  @Output() changed = new EventEmitter<number | undefined>();
  @Output() focused = new EventEmitter();
  @Output() keyPressed = new EventEmitter<number>();

  control!: AbstractControl | null;

  onChanged: (value?: number) => void = () => {};
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

  writeValue(event: any): void {
    this.value = event;
  }
}
