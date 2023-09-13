import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemgroupFilterComponent } from './itemgroup-filter.component';

describe('ItemgroupFilterComponent', () => {
  let component: ItemgroupFilterComponent;
  let fixture: ComponentFixture<ItemgroupFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemgroupFilterComponent]
    });
    fixture = TestBed.createComponent(ItemgroupFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
