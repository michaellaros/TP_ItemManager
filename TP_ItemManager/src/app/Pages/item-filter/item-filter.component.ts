import { Component } from '@angular/core';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss'],
})
export class ItemFilterComponent {
  private filterItem: ItemFilterModel = new ItemFilterModel(
    '',
    '',
    '',
    0,
    50,
    'EN'
  );
  public list!: SearchedObject[];

  constructor(private http: HttpService) {}
  ngOnInit() {
    this.GetItems();
  }

  GetItems() {
    let list: SearchedObject[] = [];

    this.http.FilterItems(this.filterItem).subscribe((data) => {
      Object.keys(data).forEach((key) => {
        list.push(new SearchedObject(key, data[key]));
      });
    });
    this.list = list;
    console.log(this.list);
  }
}
