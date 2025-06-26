import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { ChocolateStore } from '../store/chocolate.store';

export const chocolateDetailsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = route.paramMap.get('id')!;
  const router = inject(Router);
  const chocolateStore = inject(ChocolateStore);
  const notificationService = inject(NotificationService);

  return toObservable(chocolateStore.isLoading).pipe(
    filter((loading) => !loading),
    tap(() => {
      chocolateStore.selectChocolate(id);
    }),
    map(() => {
      const selectedChocolate = chocolateStore.selectedChocolate();
      if (!selectedChocolate) {
        notificationService.showError('Chocolate not found!');
        const rootPath = router.parseUrl('/');
        return new RedirectCommand(rootPath);
      }
      return true;
    })
  );
};
