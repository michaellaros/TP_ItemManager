import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

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
    filterForm= new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      barcode:new FormControl('')
    })
  constructor(private http: HttpService,public status:StatusService) {}
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
  ButtonPressed(){
    switch(this.status.buttonValue) {
      case 'option':
        {
          this.GetOptions()
        }
        break;
      case 'category':
        {
          this.GetCategory()
        }
        break;
        case 'item':
          {

          }
        break;
      default:
        // code block
    }
   }


   GetOptions(){

      console.log('options')

   }

   GetCategory(){
      console.log('category')
   }


  OnSubmitID() {


  }
  OnSubmitName() {


  }
  OnSubmitBarcode() {


  }
}
