import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FullChocolateModel } from '../../core/model/chocolate.model';

@Component({
  selector: 'app-chocolate-details',
  imports: [RouterLink],
  templateUrl: './chocolate-details.component.html',
  styleUrl: './chocolate-details.component.less'
})
export class ChocolateDetailsComponent {
  /* Dependency injections */
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly chocolate = this.activatedRoute.snapshot.data['chocolate'] as FullChocolateModel;
}
