import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDialogueCategoryComponent } from './modify-dialogue-category.component';

describe('ModifyDialogueCategoryComponent', () => {
  let component: ModifyDialogueCategoryComponent;
  let fixture: ComponentFixture<ModifyDialogueCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDialogueCategoryComponent]
    });
    fixture = TestBed.createComponent(ModifyDialogueCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
