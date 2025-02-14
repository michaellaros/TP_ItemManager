import { Injectable } from '@angular/core';
import { Language } from '../Models/language';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  public token!: string;
  public buttonValue: string = 'category';
  public languages: Language[] = [];
  public isLogged: string = 'false';
  public user: string = '';
  public snackbarDuration: number = 3000;
  public Flg_enableOptions: Boolean = false;
  public Flg_enableDetailedOptions: Boolean = false;
  public Flg_enableTranslations: Boolean = false;
  public Flg_enableStores: Boolean = false;
  public Flg_enableCategoryImages: Boolean = false;

  public routes = [
    { route: '/Device', label: 'Devices' },
    { route: '/Store', label: 'Stores' },
    { route: '/Menu', label: 'Menus' },
    { route: '/Category', label: 'Categories' },
    { route: '/Item', label: 'Items' },
    { route: '/Option', label: 'Options' },
    { route: '/User', label: 'Users' },
  ];

  error: Boolean = false;

  updateRoutes = () => {
    this.routes = [
      { route: '/Device', label: 'Devices' },
      { route: '/Store', label: 'Stores' },
      { route: '/Menu', label: 'Menus' },
      { route: '/Category', label: 'Categories' },
      { route: '/Item', label: 'Items' },
      { route: '/Option', label: 'Options' },
      { route: '/User', label: 'Users' },
    ].filter((route) => {
      if (route.route === '/Store' && !this.Flg_enableStores) {
        return false;
      }
      if (route.route === '/Option' && !this.Flg_enableOptions) {
        return false;
      }
      return true;
    });
  };

  constructor() {}
}
