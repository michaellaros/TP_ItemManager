import { Component, Input, signal } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { MaterialModule } from 'src/app/Modules/material.module';

import { Item } from 'src/app/Models/Item';
import { Option } from 'src/app/Models/Option';
import { Category } from 'src/app/Models/Category';
import { MatDialog } from '@angular/material/dialog';
import { ModifyDialogueItemComponent } from 'src/app/modify-dialogue-item/modify-dialogue-item.component';
import { ModifyDialogueCategoryComponent } from 'src/app/modify-dialogue-category/modify-dialogue-category.component';
import { ModifyDialogueOptionComponent } from 'src/app/modify-dialogue-option/modify-dialogue-option.component';
@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent {
  @Input() public parentData: SearchedObject[] = [
    new SearchedObject('1', 'name'),
  ];
  @Input() public columnName: string = 'Name';

  constructor(public http: HttpService, public dialog:MatDialog) {
  }

  ngOnInit() {
  }
  ModifyItem(id:string)
  {

    switch(this.columnName){
      case 'Item':
        this.http.GetItem(id).subscribe(data=>{
          console.log(data);
          this.OpenDialogModifyItem(data);
        });
        break;
      case'Category':
      this.http.GetCategory(id).subscribe(data=>{
        console.log(data);
        this.OpenDialogModifyCategory(data);
      });
      break;
      case'Option':
      this.http.GetOption(id).subscribe(data=>{
        console.log(data);
        this.OpenDialogModifyOption(data);
      });
      break;
    }


  }

  OpenDialogModifyItem(item:Item) {
    const dialogRef = this.dialog.open(ModifyDialogueItemComponent, {
      data: item,
    });
  }
  OpenDialogModifyCategory(category:Category) {
    const dialogRef = this.dialog.open(ModifyDialogueCategoryComponent, {
      data: category,
    });
  }
  OpenDialogModifyOption(option:Option) {
    const dialogRef = this.dialog.open(ModifyDialogueOptionComponent, {
      data: option
    });
  }
}


