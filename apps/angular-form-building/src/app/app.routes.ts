import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./santa-list/santa-list.routes').then((c) => c.appRoutes),
    title: `Santa's List`,
  },
];
