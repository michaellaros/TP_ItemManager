import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskFilterComponent } from './kiosk-filter.component';

describe('KioskFilterComponent', () => {
  let component: KioskFilterComponent;
  let fixture: ComponentFixture<KioskFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KioskFilterComponent]
    });
    fixture = TestBed.createComponent(KioskFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
