import { Component, computed, input } from '@angular/core';
import { Price, Product } from '../../../../core/model/product.model';

interface PriceStats {
  minPrice: string;
  avgPrice: string;
  cheapestShop: Price;
}

@Component({
  selector: 'app-chocolate-card',
  imports: [],
  templateUrl: './chocolate-card.component.html',
  styleUrl: './chocolate-card.component.less'
})
export class ChocolateCardComponent {
  readonly chocolate = input.required<Product>();
  readonly chocolateStats = computed(() => this.calculatePriceStats(this.chocolate()));

  calculatePriceStats(chocolate: Product): PriceStats | undefined {
    if (chocolate.prices.length === 0) {
      return undefined;
    }

    const pricesPerUnit = chocolate.prices.map((p) => (p.price / p.amount) * 100);
    const minPrice = Math.min(...pricesPerUnit);
    const avgPrice = pricesPerUnit.reduce((a, b) => a + b, 0) / pricesPerUnit.length;
    const cheapestShop = chocolate.prices.find((p) => (p.price / p.amount) * 100 === minPrice) ?? chocolate.prices[0];

    return {
      minPrice: minPrice.toFixed(2),
      avgPrice: avgPrice.toFixed(2),
      cheapestShop: cheapestShop
    };
  }
}
