import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, input, OnInit, Output, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfiguration } from '@libs/domain';
import { Store } from '@ngrx/store';
import { debounceTime, filter, tap } from 'rxjs';

import { buildFormGroup } from '../../functions';
import { FieldComponent } from '../field.component';

import { selectStatePropertySingleValue } from './generic-selectors';

export type ContentConfiguration = {
  [key: string]: FieldConfiguration<any>;
};

@Component({
  selector: 'lib-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FieldComponent],
  styleUrl: './content.component.scss',
  template: `
    <div class="header">
      <ng-content select="header"></ng-content>
    </div>
    @if(this.data()){
    <div class="section" [ngClass]="layout()" [formGroup]="formGroup">
      @for(field of fields; track field){
      <lib-field [fieldConfig]="configurations()![field]"></lib-field>
      }

      <ng-content></ng-content>
    </div>
    }
  `,
})
export class ContentComponent implements OnInit {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();

  destroyRef = inject(DestroyRef);
  #store = inject(Store);

  configurations = input.required<ContentConfiguration>();
  layout = input<'one-column' | 'two-column' | 'three-column'>('one-column');
  routeId = input.required<number | undefined>();
  stateFeatureKey = input.required<string>();
  stateProperty = input.required<string>();

  data!: Signal<any | undefined>;

  fields: string[] = [];
  formGroup!: FormGroup;
  formChanged: any;
  formValue!: any;

  ngOnInit(): void {
    this.data = this.#store.selectSignal(
      selectStatePropertySingleValue(this.stateFeatureKey(), this.stateProperty(), (p) => p.id === this.routeId())
    );
    this.fields = Object.keys(this.configurations());
    this.formGroup = buildFormGroup(this.data(), this.configurations(), this.fields);
    this.formValue = signal(this.formGroup.value);

    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((value) => JSON.stringify(this.data()) !== JSON.stringify(value)),
        debounceTime(500),
        tap((value) => this.dataChanged.emit({ ...this.data, ...value, id: this.data()['id'] }))
      )
      .subscribe();
  }
}
