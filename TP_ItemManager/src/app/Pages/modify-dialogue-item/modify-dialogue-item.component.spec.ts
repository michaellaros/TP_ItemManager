import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDialogueItemComponent } from './modify-dialogue-item.component';

describe('ModifyDialogueItemComponent', () => {
  let component: ModifyDialogueItemComponent;
  let fixture: ComponentFixture<ModifyDialogueItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDialogueItemComponent]
    });
    fixture = TestBed.createComponent(ModifyDialogueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
