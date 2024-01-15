import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiscountFilterModel } from 'src/app/Models/DiscountFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalDiscountComponent } from 'src/app/Pages/modal-discount/modal-discount.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';

@Component({
  selector: 'app-discount-filter',
  templateUrl: './discount-filter.component.html',
  styleUrls: ['./discount-filter.component.scss'],
})
export class DiscountFilterComponent {
  public list!: SearchedObject[];
  public imgPreviewList: any;
  public folderName!: string;
  public errorList!: {
    id: string;
    ip: string;
    szRetailStoreId: string;
    storeName: string;
  }[];

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public storage: StorageManagerService
  ) {}
  filterForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    // barcode: new FormControl('')
  });
  ngOnInit() {
    this.GetDiscounts();
  }
  ResetForm() {
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

  OpenDialogReturnError(
    errors: {
      id: string;
      ip: string;
      szRetailStoreId: string;
      storeName: string;
    }[]
  ) {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      data: errors,
    });
    dialogRef.afterClosed().subscribe(() => this.GetDiscounts());
  }

  UpdateDiscount() {
    this.spinner.show();
    this.http.ReplicationDiscount().subscribe(
      (data) => {
        this.spinner.hide();
        console.log('subscribe');
        this.errorList = data;
        if (this.errorList != undefined && this.errorList.length > 0)
          // alert('error for store {{}}');

          this.OpenDialogReturnError(this.errorList);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
