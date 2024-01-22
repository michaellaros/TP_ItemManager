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
import { ResponseStoreUpdate } from 'src/app/Models/ResponseStoreUpdate';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeObject } from 'src/app/Models/TreeObject';
import { count } from 'rxjs';

@Component({
  selector: 'app-kiosk-filter',
  templateUrl: './kiosk-filter.component.html',
  styleUrls: ['./kiosk-filter.component.scss'],
})
export class KioskFilterComponent {
  public stores!: Store[];
  public countries: Country[] = [];
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    hostname: new FormControl(''),
    ip: new FormControl(''),
  });
  treeControl = new NestedTreeControl<TreeObject>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeObject>();

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
      let countries = data;
      console.log(countries);
      countries.forEach((country) =>
        country.stores?.forEach(
          (store: Store) =>
            (store.formattedKiosk = this.GetStoreKioskFromCountry(store))
        )
      );
      return (this.dataSource.data = this.GetTreeFromCountries(countries));
    });
  }

  GetTreeFromCountries(countries: Country[]) {
    let tree: TreeObject[] = [];
    countries.forEach((country) => {
      let countryNode = new TreeObject(country.id, country.name, 'country', []);
      country.stores?.forEach((store) => {
        let storeNode = new TreeObject(store.id, store.name, 'store', []);
        store.formattedKiosk?.forEach((kiosk) => {
          storeNode.children?.push(
            new TreeObject(kiosk.id, kiosk.name, 'kiosk', [])
          );
        });
        countryNode.children?.push(storeNode);
      });
      tree.push(countryNode);
    });
    return tree;
  }
  hasChild = (_: number, node: TreeObject) =>
    !!node.children && node.children.length > 0;

  GetStores() {
    // this.http.FilterStore({}).subscribe((data) => {
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
        let errorList: StoreModel[] = [];
        errorList = data;
        if (errorList != undefined && errorList.length > 0) {
          // alert('error for store {{}}');
          this.spinner.hide();

          this.OpenDialogReturnError(errorList);
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  UpdateStore(id: string) {
    this.spinner.show();

    this.http.StoresUpdate(id).subscribe(
      (data) => {
        let errorList: StoreModel[] = [];
        errorList = data;
        if (errorList != undefined && errorList.length > 0) {
          // alert('error for store {{}}');
          this.spinner.hide();

          this.OpenDialogReturnError(errorList);
        } else {
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  OpenDialogReturnError(errors: ResponseStoreUpdate[]) {
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

  OpenDialogAddKiosk(store: TreeObject) {
    const dialogRef = this.dialog.open(ModalKioskComponent, {
      width: '60vw',
      data: { store: store, kiosk: null },
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) this.GetCountries();
    });
  }

  OpenDialogAddStore(country: TreeObject) {
    const dialogRef = this.dialog.open(ModalStoreComponent, {
      width: '60vw',
      data: { country_name: country.name, country_id: country.id, store: null },
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) this.GetCountries();
    });
  }

  OpenDialogEditStore(id: string) {
    this.http.GetStore(id).subscribe((data) => {
      const dialogRef = this.dialog.open(ModalStoreComponent, {
        width: '60vw',
        data: data,
      });
      dialogRef.afterClosed().subscribe((data: boolean) => {
        if (data) this.GetCountries();
      });
    });
  }

  GetStoreKiosks(store: Store) {
    let list: SearchedObject[] = [];
    Object.keys(store.kiosks).forEach((key) => {
      list.push(new SearchedObject(key, store.kiosks[key]));
    });
    return list;
  }

  DeleteObject(node: TreeObject) {
    if (confirm('The element will be deleted permanently!')) {
      //todo cambiare pop up
      this.http.DeleteObject(node.type!, node.id!).subscribe(() => {
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
      dialogRef.afterClosed().subscribe((data: boolean) => {
        if (data) this.GetCountries();
      });
    });
  }
  OpenDialogAddCountry() {
    const dialogRef = this.dialog.open(ModalCountryComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) this.GetCountries();
    });
  }

  OpenDialogEditKiosk(id: string) {
    this.http.GetKiosk(id).subscribe((data) => {
      const dialogRef = this.dialog.open(ModalKioskComponent, {
        data: { kiosk: data },
        width: '60vw',
      });
      // const { data, role } = await modal.onWillDismiss();
      // if (role === 'confirm') {
      //   this.code = data;
      //   this.Search(codeType);
      // }
      dialogRef.afterClosed().subscribe((data: boolean) => {
        if (data) this.GetCountries();
      });
    });
  }

  OpenEditDialog(node: TreeObject) {
    switch (node.type) {
      case 'country':
        this.OpenDialogEditCountry(node.id!);
        break;
      case 'store':
        this.OpenDialogEditStore(node.id!);
        break;
      case 'kiosk':
        this.OpenDialogEditKiosk(node.id!);
        break;
    }
  }

  GetAlwaysOpen(node: TreeObject) {
    return this.dataSource.data.length == 1 && node.type == 'country';
  }
}
