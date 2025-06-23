import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChocolatesHttpService } from '../http/chocolates-http.service';
import { BaseChocolateModel, FullChocolateModel } from '../model/chocolate.model';
import { Pagination } from '../model/pagination.model';

@Injectable({ providedIn: 'root' })
export class ChocolatesService {
  /* Dependency injections */
  private readonly chocolatesHttpService = inject(ChocolatesHttpService);

  getChocolates(): Observable<Pagination<FullChocolateModel>> {
    return this.chocolatesHttpService.getChocolates().pipe(
      map((paginationData) => ({
        ...paginationData,
        data: paginationData.data.map((chocolate) => this.convertToFullModel(chocolate))
      }))
    );
  }

  getChocolateById(id: string): Observable<FullChocolateModel | undefined> {
    return this.chocolatesHttpService
      .getChocolateById(id)
      .pipe(map((chocolate) => (chocolate ? this.convertToFullModel(chocolate) : undefined)));
  }

  private convertToFullModel(chocolate: BaseChocolateModel): FullChocolateModel {
    return {
      ...chocolate,
      prices: chocolate.prices.map((price) => {
        let pricePerUnit = Number((((price.price / price.amount) * 100) / (price.unit === 'kg' ? 1000 : 1)).toFixed(2));

        return {
          ...price,
          pricePerUnit
        };
      })
    };
  }
}
