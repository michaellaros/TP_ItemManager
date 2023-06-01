import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedEditorComponent } from './assigned-editor.component';

describe('AssignedEditorComponent', () => {
  let component: AssignedEditorComponent;
  let fixture: ComponentFixture<AssignedEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedEditorComponent]
    });
    fixture = TestBed.createComponent(AssignedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
