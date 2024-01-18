import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { Language } from 'src/app/Models/language';
import { AuthService } from 'src/app/Services/auth-services/auth.service';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalCountryComponent } from '../modal-country/modal-country.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { ResponseStoreUpdate } from 'src/app/Models/ResponseStoreUpdate';
import { StoreModel } from 'src/app/Models/StoreModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/Services/http.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentRoute!: string;
  public language!: string;
  constructor(
    public status: StatusService,
    private authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    public storage: StorageManagerService,
    private spinner: NgxSpinnerService,
    private http: HttpService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = (event as NavigationEnd).url;
      });
  }
  ngOnInit() {
    this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((lang) => {
      this.language = lang.lang;
    });
  }
  setLanguage(language: any) {
    this.translate.use(language);
  }
  Logout() {
    this.authService.logout();
  }

  handleButtonClick(event: Event): void {
    event.stopPropagation();
    this.status.deleteMode = !this.status.deleteMode;
  }

  GetCountries() {
    // this.http.GetCountries().subscribe((data) => {
    //   let countries = data;
    //   countries.forEach((country) =>
    //     country.stores?.forEach(
    //       (store: Store) =>
    //         (store.formattedKiosk = this.GetStoreKioskFromCountry(store))
    //     )
    //   );
    //   return (this.dataSource.data = this.GetTreeFromCountries(countries));
    // });
  }

  OpenDialogReturnError(errors: ResponseStoreUpdate[]) {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      data: errors,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetCountries();
    });
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

  OpenDialogAddCountry() {
    const dialogRef = this.dialog.open(ModalCountryComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        if (this.currentRoute == '/Kiosk') window.location.reload();
        else this.router.navigate(['/Kiosk']);
        // this.GetCountries();
      }
    });
  }
}
