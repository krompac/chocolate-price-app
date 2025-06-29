import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FullChocolateModel } from '../../../../core/model/chocolate.model';
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive';
import { PriceStats } from '../../models/price-stats.model';

@Component({
  selector: 'app-chocolate-card',
  imports: [StopPropagationDirective],
  templateUrl: './chocolate-card.component.html',
  styleUrl: './chocolate-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChocolateCardComponent {
  readonly chocolate = input.required<FullChocolateModel>();
  readonly chocolateStats = computed(() => this.calculatePriceStats(this.chocolate()));

  calculatePriceStats(chocolate: FullChocolateModel): PriceStats | undefined {
    if (chocolate.prices.length === 0) {
      return undefined;
    }

    const pricesPerUnit = chocolate.prices.map((p) => p.pricePerUnit);
    const minPrice = Math.min(...pricesPerUnit);
    const avgPrice = pricesPerUnit.reduce((a, b) => a + b, 0) / pricesPerUnit.length;
    const cheapestShop = chocolate.prices.find((p) => p.pricePerUnit === minPrice) ?? chocolate.prices[0];

    return {
      minPrice: minPrice.toFixed(2),
      avgPrice: avgPrice.toFixed(2),
      cheapestShop: cheapestShop
    };
  }
}
