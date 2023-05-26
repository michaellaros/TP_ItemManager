import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryFilterModel } from 'src/app/Models/CategoryFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  private filterItem: CategoryFilterModel = new CategoryFilterModel(
    '',
    '',
    0,
    50,
    'EN'
  );
  public list!: SearchedObject[];
  constructor(private http: HttpService,public status:StatusService) {}
  filterForm= new FormGroup({
    id:new FormControl(''),
    name: new FormControl(''),
    barcode:new FormControl('')
  })
  ngOnInit() {
    this.GetCategory()
  }

  GetCategory() {
    let id=this.filterForm.get('id')?.value!;
    let name=this.filterForm.get('name')?.value!;
    let barcode=this.filterForm.get('barcode')?.value!;

    let list: SearchedObject[] = [];

    this.http.FilterCategory(new CategoryFilterModel(id,name,0,50,'')).subscribe((data) => {
      Object.keys(data).forEach((key) => {
        list.push(new SearchedObject(key, data[key]));
      });
    });
    this.list = list;
  }



}
