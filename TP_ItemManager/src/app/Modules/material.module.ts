import { NgModule } from '@angular/core';

import {MatTableModule} from '@angular/material/table';


import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const MaterialComponents = [
  MatButtonModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatCheckboxModule
  ,MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule

];

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
