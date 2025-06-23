import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ChocolatesService } from './core/services/chocolates.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/chocolates-overview/chocolates-overview.component').then(
        (component) => component.ChocolatesOverviewComponent
      )
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./features/chocolate-details/chocolate-details.component').then(
        (component) => component.ChocolateDetailsComponent
      ),
    resolve: {
      chocolate: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const chocolatesService = inject(ChocolatesService);
        const id = route.paramMap.get('id')!;

        return chocolatesService.getChocolateById(id);
      }
    }
  }
];
