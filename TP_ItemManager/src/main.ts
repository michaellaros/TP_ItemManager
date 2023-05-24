import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, isDevMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './app/enviroments/environment';


export const getBaseUrl = () => {
  if (isDevMode()) {
    return 'http://localhost:5172/swagger';

  } else {

    const url = document.getElementsByTagName('base')[0].href;
    const arr = url.split('/');
    return arr[0] + '//' + arr[2] + '/TP_ItemManager';
  }
};

export const getAssetsUrl = () => {
  if (isDevMode()) {
    return '/assets/';
  } else {
    return 'assets/';
  }
};
const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'ASSETS_URL', useFactory: getAssetsUrl, deps: [] },
];
if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

