import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKioskComponent } from './modal-kiosk.component';

describe('ModalKioskComponent', () => {
  let component: ModalKioskComponent;
  let fixture: ComponentFixture<ModalKioskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalKioskComponent]
    });
    fixture = TestBed.createComponent(ModalKioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
