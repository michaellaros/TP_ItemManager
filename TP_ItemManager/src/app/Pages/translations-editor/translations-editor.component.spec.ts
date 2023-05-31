import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsEditorComponent } from './translations-editor.component';

describe('TranslationsEditorComponent', () => {
  let component: TranslationsEditorComponent;
  let fixture: ComponentFixture<TranslationsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationsEditorComponent]
    });
    fixture = TestBed.createComponent(TranslationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
