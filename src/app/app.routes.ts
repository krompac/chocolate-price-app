import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/chocolates-overview/chocolates-overview.component'
      ).then((component) => component.ChocolatesOverviewComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./features/chocolate-details/chocolate-details.component').then(
        (component) => component.ChocolateDetailsComponent
      ),
  },
];
