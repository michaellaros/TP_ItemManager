import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFilterComponent } from './menu-filter.component';

describe('MenuFilterComponent', () => {
  let component: MenuFilterComponent;
  let fixture: ComponentFixture<MenuFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFilterComponent]
    });
    fixture = TestBed.createComponent(MenuFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
