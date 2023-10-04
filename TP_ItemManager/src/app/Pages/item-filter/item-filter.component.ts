import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/Models/Category';
import { Item } from 'src/app/Models/Item';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalItemComponent } from 'src/app/Pages/modal-item/modal-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss'],
})
export class ItemFilterComponent {
  public list!: SearchedObject[];
  public CSV?: string[];
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
    barcode: new FormControl(''),
  });
  ngOnInit() {
    this.GetItems();

  }
  ResetForm(){
    this.filterForm.reset();
    this.GetItems();
  }
  GetItems() {
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
      .FilterItems(new ItemFilterModel(id, name, barcode, 0, 50))
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

  OpenDialogModifyItem() {
    const dialogRef = this.dialog.open(ModalItemComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => this.GetItems());
  }


  UploadFile(files: any) {
    console.log(files.target.files);
    console.log(URL.createObjectURL(files.target.files[0]));
    let CSV = files.target.files[0];
    console.log(CSV.name)
    if (CSV)
      this.http.UploadCSV(CSV).subscribe((data) => {
        CSV = data;
        this._snackBar.open('CSV successfully uploaded!', 'Confirm');

      });
  }

}
