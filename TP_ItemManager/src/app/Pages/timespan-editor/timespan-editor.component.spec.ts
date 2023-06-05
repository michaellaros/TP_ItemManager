import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespanEditorComponent } from './timespan-editor.component';

describe('TimespanEditorComponent', () => {
  let component: TimespanEditorComponent;
  let fixture: ComponentFixture<TimespanEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimespanEditorComponent]
    });
    fixture = TestBed.createComponent(TimespanEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
