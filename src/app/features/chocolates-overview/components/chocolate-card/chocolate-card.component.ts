import { Component, computed, input } from '@angular/core';
import { Product } from '../../../../core/model/product.model';

@Component({
  selector: 'app-chocolate-card',
  imports: [],
  templateUrl: './chocolate-card.component.html',
  styleUrl: './chocolate-card.component.css',
})
export class ChocolateCardComponent {
  readonly chocolate = input.required<Product>();
  readonly chocolateStats = computed(() =>
    this.calculatePriceStats(this.chocolate())
  );

  calculatePriceStats(chocolate: Product) {
    const pricesPerUnit = chocolate.prices.map(
      (p) => (p.price / p.amount) * 100
    );
    const minPrice = Math.min(...pricesPerUnit);
    const avgPrice =
      pricesPerUnit.reduce((a, b) => a + b, 0) / pricesPerUnit.length;
    const cheapestShop =
      chocolate.prices.find((p) => (p.price / p.amount) * 100 === minPrice) ??
      chocolate.prices[0];

    return {
      minPrice: minPrice.toFixed(2),
      avgPrice: avgPrice.toFixed(2),
      cheapestShop: cheapestShop,
    };
  }
}
