import { Component } from '@angular/core';
import { MaterialModule } from './Modules/material.module';
import {TranslateService} from '@ngx-translate/core';
import { HttpService } from './Services/http.service';
import { StatusService } from './Services/status.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TP_ItemManager';
  constructor(private http: HttpService,
    translate: TranslateService,public status:StatusService) {
    this.http.GetLanguages().subscribe((data) => {
      //default language is the first language in language.json
      // this language will be used as a fallback when a translation isn't found in the current language
      // translate.setDefaultLang(data[0].value!);
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(data[1].value!);
      status.languages = data;
    });
}
}
