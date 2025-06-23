import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TEST_DATA } from '../../test-data';
import { Pagination } from '../model/pagination.model';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ChocolatesHttpService {
  /* Dependency injections */
  private readonly httpClient = inject(HttpClient);

  getChocolates(): Observable<Pagination<Product>> {
    // TODO: replace later with http call via http client
    return of(TEST_DATA).pipe(delay(1000));
  }
}
