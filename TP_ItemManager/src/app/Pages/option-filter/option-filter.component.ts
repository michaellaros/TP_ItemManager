import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OptionFilterModel } from 'src/app/Models/OptionFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-option-filter',
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.scss'],
})
export class OptionFilterComponent {
  private filterItem: OptionFilterModel = new OptionFilterModel(
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
    name: new FormControl('')
  })
  ngOnInit() {
    this.GetOption()
  }

  GetOption() {
    let id=this.filterForm.get('id')?.value!;
    let name=this.filterForm.get('name')?.value!;

    let list: SearchedObject[] = [];

    this.http.FilterOption(new OptionFilterModel(id,name,0,50,'EN')).subscribe((data) => {
      Object.keys(data).forEach((key) => {
        list.push(new SearchedObject(key, data[key]));
      });
    });
    this.list = list;
  }



}
