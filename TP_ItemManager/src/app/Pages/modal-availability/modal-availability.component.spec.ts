import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAvailabilityComponent } from './modal-availability.component';

describe('ModalAvailabilityComponent', () => {
  let component: ModalAvailabilityComponent;
  let fixture: ComponentFixture<ModalAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAvailabilityComponent]
    });
    fixture = TestBed.createComponent(ModalAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
