import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFilterComponent } from './Pages/item-filter/item-filter.component';
import { CategoryFilterComponent } from './Pages/category-filter/category-filter.component';
import { OptionFilterComponent } from './Pages/option-filter/option-filter.component';


const routes: Routes = [
  { path: 'CategoryFilter', component: CategoryFilterComponent },
  { path: 'ItemFilter', component: ItemFilterComponent },
  { path: 'OptionFilter', component: OptionFilterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
