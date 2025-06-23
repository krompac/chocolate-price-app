import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ChocolatesService } from '../../core/services/chocolates.service';
import { ChocolateCardComponent } from './components/chocolate-card/chocolate-card.component';

@Component({
  selector: 'app-chocolates-overview',
  imports: [ChocolateCardComponent, RouterLink],
  templateUrl: './chocolates-overview.component.html',
  styleUrl: './chocolates-overview.component.css'
})
export class ChocolatesOverviewComponent {
  /* Dependency injections */
  private readonly chocolatesService = inject(ChocolatesService);

  readonly chocolates = rxResource({
    stream: () => this.chocolatesService.getChocolates().pipe(map((data) => data.data)),
    defaultValue: []
  });
}
