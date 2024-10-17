import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeviceComponent } from './modal-device.component';

describe('ModalDeviceComponent', () => {
  let component: ModalDeviceComponent;
  let fixture: ComponentFixture<ModalDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeviceComponent]
    });
    fixture = TestBed.createComponent(ModalDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
