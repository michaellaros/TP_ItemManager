import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiscountFilterModel } from 'src/app/Models/DiscountFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalDiscountComponent } from 'src/app/Pages/modal-discount/modal-discount.component';

@Component({
  selector: 'app-discount-filter',
  templateUrl: './discount-filter.component.html',
  styleUrls: ['./discount-filter.component.scss']
})
export class DiscountFilterComponent {
  public list!: SearchedObject[];
  public imgPreviewList: any;
  public folderName!: string;

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,



  ) {}
  filterForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    // barcode: new FormControl('')
  });
  ngOnInit() {
    this.GetDiscounts();

  }
  ResetForm(){
    this.filterForm.reset();
    this.GetDiscounts();
  }
  GetDiscounts() {
    let id =
      this.filterForm.get('id')?.value != undefined
        ? this.filterForm.get('id')?.value!
        : '';
    let name =
      this.filterForm.get('name')?.value != undefined
        ? this.filterForm.get('name')?.value!
        : '';


    let list: SearchedObject[] = [];

    this.http
      .FilterDiscounts(new DiscountFilterModel(id, name))
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

  OpenDialogModifyDiscount() {
    const dialogRef = this.dialog.open(ModalDiscountComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => this.GetDiscounts());
  }


  UpdateDiscount(){
    this.http.ReplicationDiscount().subscribe((data) => {
      this._snackBar.open(data,'OK')
    });
  }




}
