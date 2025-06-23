import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolatesOverviewComponent } from './chocolates-overview.component';

describe('ChocolatesOverview', () => {
  let component: ChocolatesOverviewComponent;
  let fixture: ComponentFixture<ChocolatesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolatesOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChocolatesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
