import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { ChocolateStore } from './core/store/chocolate.store';

export const chocolateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = route.paramMap.get('id')!;
  const router = inject(Router);
  const chocolateStore = inject(ChocolateStore);

  return toObservable(chocolateStore.isLoading).pipe(
    filter((loading) => !loading),
    tap(() => {
      chocolateStore.selectChocolate(id);
    }),
    map(() => {
      const selectedChocolate = chocolateStore.selectedChocolate();
      if (!selectedChocolate) {
        // TODO: add toastr like error to the user
        console.error('Chocolate not found!');
        const rootPath = router.parseUrl('/');
        return new RedirectCommand(rootPath);
      }
      return true;
    })
  );
};

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
    canActivate: [chocolateGuard]
  }
];
