import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OptionFilterModel } from 'src/app/Models/OptionFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalOptionComponent } from '../modal-option/modal-option.component';
import { ModalKioskComponent } from '../modal-kiosk/modal-kiosk.component';
import { Store } from 'src/app/Models/Store';
import { ModalStoreComponent } from '../modal-store/modal-store.component';

@Component({
  selector: 'app-kiosk-filter',
  templateUrl: './kiosk-filter.component.html',
  styleUrls: ['./kiosk-filter.component.scss'],
})
export class KioskFilterComponent {
  public stores!: Store[];
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    hostname: new FormControl(''),
    ip: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.GetKiosks();
    this.GetStores();
  }
  ResetForm() {
    this.filterForm.reset();
    this.GetKiosks();
  }

  GetKiosks() {
    let hostname =
      this.filterForm.get('hostname')?.value != undefined
        ? this.filterForm.get('hostname')?.value!
        : '';
    let ip =
      this.filterForm.get('ip')?.value != undefined
        ? this.filterForm.get('ip')?.value!
        : '';

    let list: SearchedObject[] = [];

    this.http.FilterKiosk({ Hostname: hostname, IP: ip }).subscribe((data) => {
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
  GetStores() {
    this.http.FilterStore({}).subscribe((data) => {
      console.log(data);
      if (data == null) {
        this.stores = [];
      } else {
        this.stores = data;
        this.stores.forEach((store) => {
          store.formattedKiosk = this.GetStoreKiosks(store);
        });
      }
      // if (data == null) {
      //   this.stores = data || [];
      // } else {
      //   Object.keys(data).forEach((key) => {
      //     list.push(new SearchedObject(key, data[key]));
      //   });
      //   this.list = list;
      // }
    });
  }

  OpenDialogAddKiosk(store: Store) {
    const dialogRef = this.dialog.open(ModalKioskComponent, {
      width: '60vw',
      data: { store: store, kiosk: null },
    });
    dialogRef.afterClosed().subscribe(() => this.GetStores());
  }

  OpenDialogAddStore() {
    const dialogRef = this.dialog.open(ModalStoreComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => this.GetStores());
  }

  OpenDialogEditStore(id: string) {
    this.http.GetStore(id).subscribe((data) => {
      console.log(data);
      const dialogRef = this.dialog.open(ModalStoreComponent, {
        width: '60vw',
        data: data,
      });
      dialogRef.afterClosed().subscribe(() => this.GetStores());
    });
  }

  GetStoreKiosks(store: Store) {
    console.log(store.kiosks);
    let list: SearchedObject[] = [];
    Object.keys(store.kiosks).forEach((key) => {
      list.push(new SearchedObject(key, store.kiosks[key]));
    });
    return list;
  }

  DeleteObject(id: string) {
    if (confirm('The element will be deleted permanently!')) {
      //todo cambiare pop up
      this.http.DeleteObject('Store', id).subscribe(() => this.GetStores());
    }
  }
}
