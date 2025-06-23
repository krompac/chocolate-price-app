import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, of } from 'rxjs';
import { testData } from '../../test-data';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ChocolatesService {
  /* Dependency injections */
  private readonly httpClient = inject(HttpClient);

  readonly chocolates = rxResource({
    // TODO: replace later with http call via http client
    stream: () => of(testData.data as Product[]).pipe(delay(1000)),
    defaultValue: [],
  });

  constructor() {
    effect(() => console.log(this.chocolates.value()));
  }
}
