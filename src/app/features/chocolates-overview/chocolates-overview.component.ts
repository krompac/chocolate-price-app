import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  readonly chocolates = this.chocolatesService.chocolates.value;
}
