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
import { Country } from 'src/app/Models/Country';
import { ModalCountryComponent } from '../modal-country/modal-country.component';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { StoreModel } from 'src/app/Models/StoreModel';

@Component({
  selector: 'app-kiosk-filter',
  templateUrl: './kiosk-filter.component.html',
  styleUrls: ['./kiosk-filter.component.scss'],
})
export class KioskFilterComponent {
  public stores!: Store[];
  public errorList!: StoreModel[];

  public countries: Country[] = [];
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    hostname: new FormControl(''),
    ip: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog,
    public storage: StorageManagerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.GetCountries();
  }
  GetCountries() {
    this.http.GetCountries().subscribe((data) => {
      this.countries = data;
      this.countries.forEach((country) =>
        country.stores!.forEach(
          (store: Store) =>
            (store.formattedKiosk = this.GetStoreKioskFromCountry(store))
        )
      );
    });
  }

  GetStores() {
    // this.http.FilterStore({}).subscribe((data) => {
    //   console.log(data);
    //   if (data == null) {
    //     this.stores = [];
    //   } else {
    //     this.countries = data;
    //     });
  }
  // if (data == null) {
  //   this.stores = data || [];
  // } else {
  //   Object.keys(data).forEach((key) => {
  //     list.push(new SearchedObject(key, data[key]));
  //   });
  //   this.list = list;
  // }
  //   });
  // }
  GetStoreKioskFromCountry(store: Store): SearchedObject[] {
    let list: SearchedObject[] = [];
    Object.keys(store.kiosks).forEach((key) => {
      list.push(new SearchedObject(key, store.kiosks[key]));
    });
    return list;
  }

  ResetForm() {
    this.filterForm.reset();
    this.GetKiosks();
  }

  UpdateStores() {
    this.spinner.show();

    this.http.StoresUpdate('').subscribe(
      (data) => {
        console.log('subscribe');
        this.errorList = data;
        if (this.errorList.length > 0) {
          // alert('error for store {{}}');
          this.spinner.hide();
          let errors: {
            id: string;
            ip: string;
            szRetailStoreId: string;
            storeName: string;
          }[] = [];
          this.errorList.forEach((element) => {
            errors.push({
              id: element.id!,
              ip: element.ip!,
              szRetailStoreId: element.szRetailStoreId!,
              storeName: element.storeName!,
            });
          });
          this.OpenDialogReturnError(errors);
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
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
    dialogRef.afterClosed().subscribe(() => {
      this.GetCountries();
    });
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

  OpenDialogAddKiosk(store: Store) {
    const dialogRef = this.dialog.open(ModalKioskComponent, {
      width: '60vw',
      data: { store: store, kiosk: null },
    });
    dialogRef.afterClosed().subscribe(() => this.GetCountries());
  }

  OpenDialogAddStore(country: Country) {
    const dialogRef = this.dialog.open(ModalStoreComponent, {
      width: '60vw',
      data: { country_name: country.name, country_id: country.id, store: null },
    });
    dialogRef.afterClosed().subscribe(() => this.GetCountries());
  }

  OpenDialogEditStore(id: string) {
    this.http.GetStore(id).subscribe((data) => {
      const dialogRef = this.dialog.open(ModalStoreComponent, {
        width: '60vw',
        data: data,
      });
      dialogRef.afterClosed().subscribe(() => this.GetCountries());
    });
  }

  GetStoreKiosks(store: Store) {
    let list: SearchedObject[] = [];
    Object.keys(store.kiosks).forEach((key) => {
      list.push(new SearchedObject(key, store.kiosks[key]));
    });
    return list;
  }

  DeleteObject(id: string, type: string) {
    if (confirm('The element will be deleted permanently!')) {
      //todo cambiare pop up
      this.http.DeleteObject(type, id).subscribe(() => {
        this.GetCountries();
      });
    }
  }

  OpenDialogEditCountry(id: string) {
    this.http.GetCountry(id).subscribe((data) => {
      const dialogRef = this.dialog.open(ModalCountryComponent, {
        width: '60vw',
        data: data,
      });
      dialogRef.afterClosed().subscribe(() => this.GetCountries());
    });
  }
  OpenDialogAddCountry() {
    const dialogRef = this.dialog.open(ModalCountryComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => this.GetCountries());
  }
}
