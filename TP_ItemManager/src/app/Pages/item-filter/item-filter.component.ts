import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/Models/Item';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModifyDialogueItemComponent } from 'src/app/modify-dialogue-item/modify-dialogue-item.component';

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
  constructor(private http: HttpService,public status:StatusService, public dialog:MatDialog) {}
  filterForm= new FormGroup({
    id:new FormControl(''),
    name: new FormControl(''),
    barcode:new FormControl('')
  })
  ngOnInit() {
    this.GetItems()
  }

  GetItems() {
    let id=this.filterForm.get('id')?.value!;
    let name=this.filterForm.get('name')?.value!;
    let barcode=this.filterForm.get('barcode')?.value!;

    let list: SearchedObject[] = [];

    this.http.FilterItems(new ItemFilterModel(id,name,barcode,0,50,'EN')).subscribe((data) => {
      Object.keys(data).forEach((key) => {
        list.push(new SearchedObject(key, data[key]));
      });
    });
    this.list = list;
  }

  ModifyObject()
  {
          this.OpenDialogModifyItem();
  }


  OpenDialogModifyItem() {
    const dialogRef = this.dialog.open(ModifyDialogueItemComponent);
  }


}
