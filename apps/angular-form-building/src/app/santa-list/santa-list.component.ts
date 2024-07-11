import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectSantaList, selectNaughtyList, selectNiceList } from './state/santa-list-selectors';

@Component({
  selector: 'app-santa-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatTableModule, MatPaginatorModule],
  styles: `
  .actions{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }
  `,
  template: `
    <div class="page">
      <div class="actions">
        <!-- <input type="text" [(ngModel)]="filterText()" placeholder="Search list"/> -->
        <button mat-button class="button naughty" (click)="filter(true)">
          <span class="material-symbols-outlined ">sentiment_extremely_dissatisfied </span> Naughty
        </button>
        <button mat-button class="button nice" (click)="filter(false)">
          <span class="material-symbols-outlined">sentiment_excited </span>Nice
        </button>
      </div>
      <table mat-table matSort [dataSource]="people() ?? []">
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let person">
            <a [routerLink]="person.id" [relativeTo]="route"> View Detail</a>
            <!-- <button mat-button class="button nice" (click)="filter(false)">
              <span class="material-symbols-outlined">sentiment_excited </span>Nice
            </button> -->
          </td>
        </ng-container>
        <ng-container matColumnDef="firstName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>First Name</th>
          <td mat-cell *matCellDef="let person">{{ person.firstName }}</td>
        </ng-container>
        <ng-container matColumnDef="lastName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Name</th>
          <td mat-cell *matCellDef="let person">{{ person.lastName }}</td>
        </ng-container>
        <ng-container matColumnDef="favoriteColor">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Favorite Color</th>
          <td mat-cell *matCellDef="let person">{{ person.favoriteColor }}</td>
        </ng-container>
        <ng-container matColumnDef="isNaughty">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Naughty or Nice</th>
          <td mat-cell *matCellDef="let person">
            <span class="material-symbols-outlined" [ngClass]="person.isNaughty ? 'naughty' : 'nice'">
              {{ person.isNaughty ? 'sentiment_extremely_dissatisfied' : 'sentiment_excited' }}
            </span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
        <tr mat-row *matRowDef="let myRowData; columns: columnsToDisplay"></tr>

        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons aria-label="Select page of periodic elements"> </mat-paginator>
      </table>
    </div>
  `,
})
export class SantaListComponent implements AfterViewInit {
  route = inject(ActivatedRoute);
  #store = inject(Store);
  people = this.#store.selectSignal(selectSantaList);

  dataSource = new MatTableDataSource(this.people());
  columnsToDisplay = ['actions', 'firstName', 'lastName', 'favoriteColor', 'isNaughty'];

  filterText = signal<string>('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(isNaughty: boolean) {
    console.log({ isNaughty });
    const filteredPeople = isNaughty ? this.#store.selectSignal(selectNaughtyList)() : this.#store.selectSignal(selectNiceList)();

    this.dataSource.data = filteredPeople ?? [];
    console.log({ filteredPeople });
  }
}
