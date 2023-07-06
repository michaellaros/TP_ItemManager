import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { Language } from 'src/app/Models/language';
import { AuthService } from 'src/app/Services/auth-services/auth.service';
import { StatusService } from 'src/app/Services/status.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentRoute!: string;
  public language!: string;
  constructor(public status: StatusService,private authService:AuthService, public router: Router,public translate: TranslateService) {

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = (event as NavigationEnd).url;
        console.log(this.currentRoute);
      });


  }
  ngOnInit() {
    console.log(this.currentRoute)
    this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((lang) => {
      this.language = lang.lang;
    });
  }
  setLanguage(language: any) {
    this.translate.use(language);
    console.log(language)
  }
  Logout()
  {
    this.authService.logout();

  }
}
