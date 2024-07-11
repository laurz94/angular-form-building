import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Injector, Input, input, OnInit, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfiguration } from '@libs/domain';
import { debounceTime, filter, tap } from 'rxjs';

import { buildFormGroup } from '../../functions';
import { FieldComponent } from '../field.component';

export type ContentConfiguration = {
  [key: string]: FieldConfiguration<any>;
};

@Component({
  selector: 'lib-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FieldComponent],
  styleUrl: './content.component.scss',
  template: `
    <div class="section" [ngClass]="layout" [formGroup]="formGroup">
      @for(field of fields; track field){
      <lib-field [fieldConfig]="configurations()![field]"></lib-field>
      }
    </div>
  `,
})
export class ContentComponent implements OnInit {
  @Input() data!: any;
  @Input() layout: 'one-column' | 'two-column' | 'three-column' = 'one-column';
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();

  destroyRef = inject(DestroyRef);
  #injector = inject(Injector);

  configurations = input.required<ContentConfiguration>();

  fields: string[] = [];
  formGroup!: FormGroup;
  formChanged: any;
  formValue!: any;

  ngOnInit(): void {
    this.fields = Object.keys(this.configurations());
    this.formGroup = buildFormGroup(this.data, this.configurations(), this.fields);
    this.formValue = signal(this.formGroup.value);

    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((value) => JSON.stringify(this.data) !== JSON.stringify(value)),
        debounceTime(500),
        tap((value) => this.dataChanged.emit({ ...this.data, ...value, id: this.data['id'] }))
      )
      .subscribe();
  }
}
