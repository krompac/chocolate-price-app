import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { TEST_DATA } from '../../test-data';
import { BaseChocolateModel } from '../model/chocolate.model';
import { Pagination } from '../model/pagination.model';

@Injectable({ providedIn: 'root' })
export class ChocolatesHttpService {
  /* Dependency injections */
  private readonly httpClient = inject(HttpClient);

  getChocolates(): Observable<Pagination<BaseChocolateModel>> {
    // TODO: replace later with http call via http client
    return of(TEST_DATA).pipe(delay(200));
  }

  getChocolateById(id: string): Observable<BaseChocolateModel | undefined> {
    return of(TEST_DATA).pipe(
      delay(200),
      map((data) => data.data.find((chocolate) => chocolate.id === id))
    );
  }
}
