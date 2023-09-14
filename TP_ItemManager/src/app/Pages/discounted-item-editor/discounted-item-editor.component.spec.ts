import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedItemEditorComponent } from './discounted-item-editor.component';

describe('DiscountedItemEditorComponent', () => {
  let component: DiscountedItemEditorComponent;
  let fixture: ComponentFixture<DiscountedItemEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountedItemEditorComponent]
    });
    fixture = TestBed.createComponent(DiscountedItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
