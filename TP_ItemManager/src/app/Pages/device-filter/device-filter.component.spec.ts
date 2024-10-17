import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFilterComponent } from './device-filter.component';

describe('DeviceFilterComponent', () => {
  let component: DeviceFilterComponent;
  let fixture: ComponentFixture<DeviceFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceFilterComponent]
    });
    fixture = TestBed.createComponent(DeviceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
