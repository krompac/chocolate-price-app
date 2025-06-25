import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import { filter, map } from 'rxjs';
import { FullChocolateModel } from './core/model/chocolate.model';
import { ChocolateStore } from './core/store/chocolate.store';

export const chocolateResolver: ResolveFn<FullChocolateModel | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id')!;
  const router = inject(Router);
  const chocolateStore = inject(ChocolateStore);

  return toObservable(chocolateStore.isLoading).pipe(
    filter((loading) => !loading),
    map(() => {
      const result = chocolateStore.getChocolateById(id);

      if (!result) {
        // TODO: add toastr like error to the user
        console.error('Chocolate not found!');

        const rootPath = router.parseUrl('/');
        return new RedirectCommand(rootPath);
      }

      return result;
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
    resolve: {
      chocolate: chocolateResolver
    }
  }
];
