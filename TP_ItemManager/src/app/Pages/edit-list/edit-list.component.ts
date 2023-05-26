import { Component, Input, signal } from '@angular/core';
import { StatusService } from 'src/app/Services/status.service';
import { HttpService } from 'src/app/Services/http.service';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { OptionFilterModel } from 'src/app/Models/OptionFilterModel';
import { CategoryFilterModel } from 'src/app/Models/CategoryFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent {
  @Input() public parentData: SearchedObject[] = [
    new SearchedObject('1', 'name'),
  ];
  @Input() public columnName: string = 'NAme';
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource = this.parentData;

  constructor(public http: HttpService) {
    this.dataSource = [new SearchedObject('1', 'name')];
  }

  ngOnInit() {
    this.dataSource = this.parentData;
  }
}
