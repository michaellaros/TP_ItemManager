import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStoreEditorComponent } from './country-store-editor.component';

describe('CountryStoreEditorComponent', () => {
  let component: CountryStoreEditorComponent;
  let fixture: ComponentFixture<CountryStoreEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryStoreEditorComponent]
    });
    fixture = TestBed.createComponent(CountryStoreEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
