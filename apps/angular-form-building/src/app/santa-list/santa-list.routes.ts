import { Route } from '@angular/router';

// import { PersonDetailComponent } from './person-detail.component';
import { PersonDetailComponent } from './person-detail.component';
import { SantaListComponent } from './santa-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: SantaListComponent,
    title: `Santa's List`,
  },
  {
    path: ':id',
    component: PersonDetailComponent,
    title: `Person Detail`,
  },
];
