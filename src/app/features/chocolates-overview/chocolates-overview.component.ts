import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChocolateStore } from '../../core/store/chocolate.store';
import { ChocolateCardComponent } from './components/chocolate-card/chocolate-card.component';

@Component({
  selector: 'app-chocolates-overview',
  imports: [ChocolateCardComponent, RouterLink],
  templateUrl: './chocolates-overview.component.html',
  styleUrl: './chocolates-overview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChocolatesOverviewComponent {
  /* Dependency injections */
  private readonly chocolateStore = inject(ChocolateStore);

  readonly chocolates = this.chocolateStore.chocolates.data;
  readonly loading = this.chocolateStore.isLoading;
}
