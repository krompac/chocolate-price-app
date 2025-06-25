import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { FullChocolateModel } from '../model/chocolate.model';
import { Pagination } from '../model/pagination.model';
import { ChocolatesService } from '../services/chocolates.service';

type BookSearchState = {
  chocolates: Pagination<FullChocolateModel>;
  isLoading: boolean;
};

const initialState: BookSearchState = {
  chocolates: {
    data: [],
    pagination: {
      limit: 0,
      offset: 0,
      total: 0
    }
  },
  isLoading: false
};

export const ChocolateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, chocolatesService = inject(ChocolatesService)) => ({
    loadChocolates: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return chocolatesService.getChocolates().pipe(
            tapResponse({
              next: (chocolates) => patchState(store, { chocolates }),
              error: (error) => {
                // TODO: add toastr like error to the user
                console.error(error);
                patchState(store, { chocolates: initialState.chocolates });
              },
              finalize: () => patchState(store, { isLoading: false })
            })
          );
        })
      )
    ),
    getChocolateById(id: string): FullChocolateModel | undefined {
      return store.chocolates.data().find((chocolate) => chocolate.id === id);
    }
  })),
  withHooks({
    onInit(store) {
      store.loadChocolates();
    }
  })
);
