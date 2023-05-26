import { Component, Input, signal  } from '@angular/core';
import { StatusService } from 'src/app/Services/status.service';
import { HttpService } from 'src/app/Services/http.service';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { OptionFilterModel } from 'src/app/Models/OptionFilterModel';
import { CategoryFilterModel } from 'src/app/Models/CategoryFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})

export class EditListComponent {

  @Input() public parentData! : SearchedObject[];
  @Input() public columnName! : string;
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource2:PeriodicElement[]=[];


  filterCategory:CategoryFilterModel= new CategoryFilterModel('','',0,50,'EN');
  filterOption:OptionFilterModel= new OptionFilterModel('','',0,50,'EN');
  dataSource:SearchedObject[]= []
  constructor(public status:StatusService, public http:HttpService) {



     }

ngOnInit() {
  this.dataSource2= ELEMENT_DATA
  console.log(this.parentData)
  this.dataSource=this.parentData
  console.log(this.dataSource)

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
