import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { Language } from 'src/app/Models/language';
import { StatusService } from 'src/app/Services/status.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentRoute!: string;
  public language!: string;
  constructor(public status: StatusService, public router: Router,public translate: TranslateService) {

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = (event as NavigationEnd).url;
        console.log(this.currentRoute);
      });
  }
  ngOnInit() {
    this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((lang) => {
      this.language = lang.lang;
    });
  }
  setLanguage(language: any) {
    this.translate.use(language.target.value);
  }
  Logout()
  {
    this.router.navigate(['/login-page'])
  }
}
