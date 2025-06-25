import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { FullChocolateModel } from '../../../../core/model/chocolate.model';

@Component({
  selector: 'app-nutrition-breakdown',
  imports: [AgCharts],
  templateUrl: './nutrition-breakdown.component.html',
  styleUrl: './nutrition-breakdown.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NutritionBreakdown {
  readonly chocolate = input.required<FullChocolateModel>();

  readonly options: Signal<AgChartOptions> = computed(() => {
    const chocolate = this.chocolate();

    const { fat, carbohydrates, salt, protein } = chocolate.nutrition;

    return {
      title: {
        text: 'Nutrition breakdown'
      },
      data: [
        {
          asset: 'Fat',
          amount: fat.total,
          breakdown: {
            label: 'Saturated',
            value: fat.saturated
          }
        },
        {
          asset: 'Carbohydrates',
          amount: carbohydrates.total,
          breakdown: {
            label: 'Sugar',
            value: carbohydrates.sugar
          }
        },
        {
          asset: 'Protein',
          amount: protein,
          breakdown: null
        },
        {
          asset: 'Salt',
          amount: salt,
          breakdown: null
        }
      ],
      background: {
        fill: 'transparent'
      },
      series: [
        {
          type: 'pie',
          angleKey: 'amount',
          legendItemKey: 'asset',
          sectorLabelKey: 'amount',
          sectorLabel: {
            color: 'white',
            fontWeight: 'bold'
          },
          tooltip: {
            renderer: ({ datum, angleKey }) => {
              const value = datum[angleKey];
              const asset = datum.asset;
              const breakdown = datum.breakdown;

              let tooltipContent = `
              <div style="padding: 8px;">
                <strong>${asset}</strong><br/>
                Total: ${value}g`;

              if (breakdown) {
                tooltipContent += `<br/>${breakdown.label}: ${breakdown.value}g`;
              }

              tooltipContent += '</div>';

              return tooltipContent;
            }
          }
        }
      ]
    };
  });
}
