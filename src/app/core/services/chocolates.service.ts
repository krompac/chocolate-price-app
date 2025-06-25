import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { convertToFullModel } from '../../shared/utils/convert.utils';
import { TEST_DATA } from '../../test-data';
import { FullChocolateModel } from '../model/chocolate.model';
import { Pagination } from '../model/pagination.model';

@Injectable({ providedIn: 'root' })
export class ChocolatesService {
  /* Dependency injections */
  private readonly httpClient = inject(HttpClient);

  getChocolates(): Observable<Pagination<FullChocolateModel>> {
    return of(TEST_DATA).pipe(
      delay(200), // TODO: later replace with api call, currently use this to simulate request time
      map((paginationData) => ({
        ...paginationData,
        data: paginationData.data.map((chocolate) => convertToFullModel(chocolate))
      }))
    );
  }
}
