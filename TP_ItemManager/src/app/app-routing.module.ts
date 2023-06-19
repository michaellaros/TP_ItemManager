import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFilterComponent } from './Pages/item-filter/item-filter.component';
import { CategoryFilterComponent } from './Pages/category-filter/category-filter.component';
import { OptionFilterComponent } from './Pages/option-filter/option-filter.component';
import { KioskFilterComponent } from './Pages/kiosk-filter/kiosk-filter.component';

const routes: Routes = [
  { path: 'Category', component: CategoryFilterComponent },
  { path: 'Item', component: ItemFilterComponent },
  { path: 'Option', component: OptionFilterComponent },
  { path: 'Kiosk', component: KioskFilterComponent },
  { path: '**', redirectTo: 'Kiosk' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
