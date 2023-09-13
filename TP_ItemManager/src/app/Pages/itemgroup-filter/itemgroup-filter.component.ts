import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemGroupFilterModel } from 'src/app/Models/ItemGroupFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalItemgroupComponent } from 'src/app/modal-itemgroup/modal-itemgroup.component';

@Component({
  selector: 'app-itemgroup-filter',
  templateUrl: './itemgroup-filter.component.html',
  styleUrls: ['./itemgroup-filter.component.scss']
})
export class ItemgroupFilterComponent {
  public list!: SearchedObject[];

  constructor(

  private http: HttpService,
  public status: StatusService,
  public dialog: MatDialog,
  private _snackBar: MatSnackBar,



) {}
filterForm = new FormGroup({
  id: new FormControl(''),
  name: new FormControl(''),
  barcode: new FormControl(''),
});
ngOnInit() {
  this.GetItemGroups();

}
ResetForm(){
  this.filterForm.reset();
  this.GetItemGroups();
}
GetItemGroups() {
  let id =
    this.filterForm.get('id')?.value != undefined
      ? this.filterForm.get('id')?.value!
      : '';
  let name =
    this.filterForm.get('name')?.value != undefined
      ? this.filterForm.get('name')?.value!
      : '';
  let barcode =
    this.filterForm.get('barcode')?.value != undefined
      ? this.filterForm.get('barcode')?.value!
      : '';

  let list: SearchedObject[] = [];

  this.http
    .FilterItemGroups(new ItemGroupFilterModel(id, name, barcode, 0, 50))
    .subscribe((data) => {
      if (data == null) {
        this.list = [];
      } else {
        Object.keys(data).forEach((key) => {
          list.push(new SearchedObject(key, data[key]));
        });
        this.list = list;
      }
    });
}

OpenDialogModifyItemGroup() {
  const dialogRef = this.dialog.open(ModalItemgroupComponent, {
    width: '60vw',
  });
  dialogRef.afterClosed().subscribe(() => this.GetItemGroups());
}




}
