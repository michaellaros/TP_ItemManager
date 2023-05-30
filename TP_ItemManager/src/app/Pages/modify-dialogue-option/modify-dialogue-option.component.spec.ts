import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDialogueOptionComponent } from './modify-dialogue-option.component';

describe('ModifyDialogueOptionComponent', () => {
  let component: ModifyDialogueOptionComponent;
  let fixture: ComponentFixture<ModifyDialogueOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDialogueOptionComponent]
    });
    fixture = TestBed.createComponent(ModifyDialogueOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
