import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolateCardComponent } from './chocolate-card.component';

describe('ChocolateCard', () => {
  let component: ChocolateCardComponent;
  let fixture: ComponentFixture<ChocolateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolateCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChocolateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
