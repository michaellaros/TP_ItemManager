import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCountryComponent } from './modal-country.component';

describe('ModalCountryComponent', () => {
  let component: ModalCountryComponent;
  let fixture: ComponentFixture<ModalCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCountryComponent]
    });
    fixture = TestBed.createComponent(ModalCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
