import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStoreComponent } from './modal-store.component';

describe('ModalStoreComponent', () => {
  let component: ModalStoreComponent;
  let fixture: ComponentFixture<ModalStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalStoreComponent]
    });
    fixture = TestBed.createComponent(ModalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
