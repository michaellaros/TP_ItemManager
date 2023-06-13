import { Component } from '@angular/core';
import { MaterialModule } from './Modules/material.module';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TP_ItemManager';
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('EL');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('EL');
}
}
