import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemgroupComponent } from './modal-itemgroup.component';

describe('ModalItemgroupComponent', () => {
  let component: ModalItemgroupComponent;
  let fixture: ComponentFixture<ModalItemgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalItemgroupComponent]
    });
    fixture = TestBed.createComponent(ModalItemgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
