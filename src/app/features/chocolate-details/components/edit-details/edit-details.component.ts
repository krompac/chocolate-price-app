import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChocolateStore } from '../../../../core/store/chocolate.store';

@Component({
  selector: 'app-edit-details',
  imports: [FormsModule],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDetails {
  /* Dependency injections */
  private readonly dialog = inject(DialogRef);
  private readonly store = inject(ChocolateStore);

  readonly selectedChocolate = this.store.selectedChocolate;

  readonly name = linkedSignal(() => this.selectedChocolate()?.name);
  readonly brand = linkedSignal(() => this.selectedChocolate()?.brand);

  updateSelected(): void {
    const checkValue = (value: string | undefined): string | false => (!!value && value.length > 0 ? value : false);

    const name = checkValue(this.name());
    const brand = checkValue(this.brand());

    if (name && brand) {
      this.store.updateSelectedChocolate({ name, brand });
    }

    this.dialog.close();
  }
}
