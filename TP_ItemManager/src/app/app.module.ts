import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Pages/header/header.component';
import { MaterialModule } from './Modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditListComponent } from './Pages/edit-list/edit-list.component';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { HttpService } from './Services/http.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ItemFilterComponent } from './Pages/item-filter/item-filter.component';
import { CategoryFilterComponent } from './Pages/category-filter/category-filter.component';
import { OptionFilterComponent } from './Pages/option-filter/option-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalItemComponent } from './Pages/modal-item/modal-item.component';
import { ModalCategoryComponent } from './Pages/modal-category/modal-category.component';
import { ModalOptionComponent } from './Pages/modal-option/modal-option.component';
import { FormsModule } from '@angular/forms';
import { TranslationsEditorComponent } from './Pages/translations-editor/translations-editor.component';
import { AssignedEditorComponent } from './Pages/assigned-editor/assigned-editor.component';
import { TimespanEditorComponent } from './Pages/timespan-editor/timespan-editor.component';
import { ImagePickerComponent } from './Pages/image-picker/image-picker.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KioskFilterComponent } from './Pages/kiosk-filter/kiosk-filter.component';
import { ModalKioskComponent } from './Pages/modal-kiosk/modal-kiosk.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { UserFilterComponent } from './Pages/user-filter/user-filter.component';
import { ModalUserComponent } from './Pages/modal-user/modal-user.component';
import { ModifypasswordComponent } from './Pages/modifypassword/modifypassword.component';
import { AuthGuard } from './Services/auth-services/auth.guard';
import { AuthService } from './Services/auth-services/auth.service';
import {
  AuthInterceptor,
  authInterceptorProviders,
} from './Services/auth-services/auth.interceptor';
import { errorInterceptorProviders } from './Services/auth-services/error.interceptor';
import { MenuFilterComponent } from './Pages/menu-filter/menu-filter.component';
import { ModalStoreComponent } from './Pages/modal-store/modal-store.component';
import { DiscountFilterComponent } from './Pages/discount-filter/discount-filter.component';
import { ModalDiscountComponent } from './Pages/modal-discount/modal-discount.component';
import { DiscountedItemEditorComponent } from './Pages/discounted-item-editor/discounted-item-editor.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditListComponent,
    ItemFilterComponent,
    CategoryFilterComponent,
    OptionFilterComponent,
    ModalItemComponent,
    ModalCategoryComponent,
    ModalOptionComponent,
    TranslationsEditorComponent,
    AssignedEditorComponent,
    TimespanEditorComponent,
    ImagePickerComponent,
    KioskFilterComponent,
    ModalKioskComponent,
    LoginPageComponent,
    UserFilterComponent,
    ModalUserComponent,
    ModifypasswordComponent,
    MenuFilterComponent,
    ModalStoreComponent,
    DiscountFilterComponent,
    ModalDiscountComponent,
    DiscountedItemEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'EN',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    HttpService,
    authInterceptorProviders,
    errorInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
