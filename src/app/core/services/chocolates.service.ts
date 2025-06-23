import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChocolatesHttpService } from '../http/chocolates-http.service';
import { Pagination } from '../model/pagination.model';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ChocolatesService {
  /* Dependency injections */
  private readonly chocolatesHttpService = inject(ChocolatesHttpService);

  getChocolates(): Observable<Pagination<Product>> {
    return this.chocolatesHttpService.getChocolates();
  }
}
