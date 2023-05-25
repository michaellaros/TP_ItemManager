import { Component, Input  } from '@angular/core';
import { StatusService } from 'src/app/Services/status.service';
import { HttpService } from 'src/app/Services/http.service';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { OptionFilterModel } from 'src/app/Models/OptionFilterModel';
import { CategoryFilterModel } from 'src/app/Models/CategoryFilterModel';





@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})

export class EditListComponent {

  displayedColumns: string[] = ['ID', '[tobedefined]', 'Actions'];
  dataSource = '';

  filterItem:ItemFilterModel= new ItemFilterModel(null,null,null,0,50,'EN');
  filterCategory:CategoryFilterModel= new CategoryFilterModel(null,null,0,50,'EN');
  filterOption:OptionFilterModel= new OptionFilterModel(null,null,0,50,'EN');
  constructor(public status:StatusService, public http:HttpService) {



     }

     ngOnInit() {

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
              this.GetItems()
            }
          break;
        default:
          // code block
      }
     }
     GetItems(){
      this.http.FilterItems(this.filterItem).subscribe(data=>
       {
        console.log('item')
       }
      );
     }

     GetOptions(){
      this.http.FilterOption(this.filterOption).subscribe(data=>{
        console.log('options')
      });
     }

     GetCategory(){
      this.http.FilterCategory(this.filterCategory).subscribe(data=>{
        console.log('category')
      });
     }
}
