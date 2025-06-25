import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChocolateStore } from '../../core/store/chocolate.store';
import { EditDetails } from './components/edit-details/edit-details.component';
import { EditIcon } from './components/edit-icon/edit-icon.component';

@Component({
  selector: 'app-chocolate-details',
  imports: [RouterLink, EditIcon],
  templateUrl: './chocolate-details.component.html',
  styleUrl: './chocolate-details.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChocolateDetailsComponent {
  /* Dependency injections */
  private readonly dialog = inject(Dialog);
  private readonly store = inject(ChocolateStore);

  readonly selectedChocolate = this.store.selectedChocolate;
  readonly cheapestPricePerUnit = computed(() =>
    Math.min(...(this.selectedChocolate()?.prices ?? []).map((price) => price.pricePerUnit))
  );

  openDialog(): void {
    this.dialog.open(EditDetails);
  }
}
