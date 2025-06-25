import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap, tap } from 'rxjs';
import { FullChocolateModel } from '../model/chocolate.model';
import { Pagination } from '../model/pagination.model';
import { ChocolatesService } from '../services/chocolates.service';

type BookSearchState = {
  chocolates: Pagination<FullChocolateModel>;
  selectedChocolate: FullChocolateModel | null;
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
  selectedChocolate: null,
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
    updateSelectedChocolate: rxMethod<{ name: string; brand: string }>(
      pipe(
        switchMap(({ name, brand }) => {
          const id = store.selectedChocolate()?.id;

          if (!id) {
            return of(null);
          }

          const originalChocolateArray = [...store.chocolates.data()];

          const chocolateIndex = originalChocolateArray.findIndex((chocolate) => chocolate.id === id);
          if (chocolateIndex === -1) {
            return of(null);
          }

          const initialChocolate: FullChocolateModel = { ...originalChocolateArray[chocolateIndex] };
          const updatedChocolate: FullChocolateModel = { ...initialChocolate, name, brand };

          const updatedChocolates = [...originalChocolateArray];
          updatedChocolates[chocolateIndex] = updatedChocolate;

          // Optimistic update
          patchState(store, {
            isLoading: true,
            chocolates: {
              ...store.chocolates(),
              data: updatedChocolates
            },
            selectedChocolate: updatedChocolate
          });

          return chocolatesService.updateChocolate(id, { name, brand }).pipe(
            tapResponse({
              next: () => patchState(store, { isLoading: false }),
              error: (error) => {
                console.error(error);

                patchState(store, {
                  isLoading: false,
                  chocolates: {
                    ...store.chocolates(),
                    data: originalChocolateArray
                  },
                  selectedChocolate: initialChocolate
                });
              }
            })
          );
        })
      )
    ),
    selectChocolate: rxMethod<string>(
      pipe(
        tap((id) => {
          const chocolate = store.chocolates.data().find((chocolate) => chocolate.id === id);
          patchState(store, { selectedChocolate: chocolate || null });
        })
      )
    )
  })),
  withHooks({
    onInit(store) {
      store.loadChocolates();
    }
  })
);
