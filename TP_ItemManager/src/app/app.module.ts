import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Pages/header/header.component';
import { MaterialModule } from './Modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditListComponent } from './Pages/edit-list/edit-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { ItemFilterComponent } from './item-filter/item-filter.component';
import { OptionFilterComponent } from './option-filter/option-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EditListComponent,
    CategoryFilterComponent,
    ItemFilterComponent,
    OptionFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
