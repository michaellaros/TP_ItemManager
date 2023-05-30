import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Pages/header/header.component';
import { MaterialModule } from './Modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditListComponent } from './Pages/edit-list/edit-list.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './Services/http.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ItemFilterComponent } from './Pages/item-filter/item-filter.component';
import { CategoryFilterComponent } from './Pages/category-filter/category-filter.component';
import { OptionFilterComponent } from './Pages/option-filter/option-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifyDialogueItemComponent } from './Pages/modify-dialogue-item/modify-dialogue-item.component';
import { ModifyDialogueCategoryComponent } from './Pages/modify-dialogue-category/modify-dialogue-category.component';
import { ModifyDialogueOptionComponent } from './Pages/modify-dialogue-option/modify-dialogue-option.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditListComponent,
    ItemFilterComponent,
    CategoryFilterComponent,
    OptionFilterComponent,
    ModifyDialogueItemComponent,
    ModifyDialogueCategoryComponent,
    ModifyDialogueOptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
