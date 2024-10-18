import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalStoreComponent } from '../modal-store/modal-store.component';

@Component({
  selector: 'app-store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['./store-filter.component.scss'],
})
export class StoreFilterComponent {
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    ip_address: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.GetStores();
  }
  ResetForm() {
    this.filterForm.reset();
    this.GetStores();
  }

  GetStores() {
    let id =
      this.filterForm.get('id')?.value != undefined
        ? this.filterForm.get('id')?.value!
        : '';
    let name =
      this.filterForm.get('name')?.value != undefined
        ? this.filterForm.get('name')?.value!
        : '';
    let ip_address =
      this.filterForm.get('ip_address')?.value != undefined
        ? this.filterForm.get('ip_address')?.value!
        : '';

    let list: SearchedObject[] = [];

    this.http
      .FilterStore({ Id: id, Name: name, Ip_address: ip_address })
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
  OpenDialogAddStore() {
    const dialogRef = this.dialog.open(ModalStoreComponent, {
      minWidth: '100%',
      height: '100%',
    });
    dialogRef.afterClosed().subscribe(() => this.GetStores());
  }
}
