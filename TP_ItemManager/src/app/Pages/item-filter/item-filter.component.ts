import { Component } from '@angular/core';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { PeriodicElement } from '../edit-list/edit-list.component';
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
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent {
  private filterItem:ItemFilterModel= new ItemFilterModel('','','',0,50,'EN');
  public list?:SearchedObject [];
 public columnName: string ='Item'
 public list2=ELEMENT_DATA;
constructor(private http:HttpService){}
ngOnInit() {
this.GetItems();
 }

 GetItems(){

  let list :SearchedObject[]=[];

  this.http.FilterItems(this.filterItem).subscribe(data=>{
    Object.keys(data).forEach(key=>{
      list.push(new SearchedObject(key,(data[key])));
  });
   });
   this.list = list;
   console.log(this.list)


 }
}

