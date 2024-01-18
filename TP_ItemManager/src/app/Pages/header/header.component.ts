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
    public storage: StorageManagerService
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
  OpenDialogAddCountry() {
    const dialogRef = this.dialog.open(ModalCountryComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) this.GetCountries();
    });
  }
}
