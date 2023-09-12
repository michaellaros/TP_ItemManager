import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountFilterComponent } from './discount-filter.component';

describe('DiscountFilterComponent', () => {
  let component: DiscountFilterComponent;
  let fixture: ComponentFixture<DiscountFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountFilterComponent]
    });
    fixture = TestBed.createComponent(DiscountFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
