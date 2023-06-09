import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFilterComponent } from './Pages/item-filter/item-filter.component';
import { CategoryFilterComponent } from './Pages/category-filter/category-filter.component';
import { OptionFilterComponent } from './Pages/option-filter/option-filter.component';
import { KioskFilterComponent } from './Pages/kiosk-filter/kiosk-filter.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { UserFilterComponent } from './Pages/user-filter/user-filter.component';
import { ModifypasswordComponent } from './Pages/modifypassword/modifypassword.component';
import { AuthGuard } from './Services/auth-services/auth.guard';
const routes: Routes = [
  { path: 'Category', component: CategoryFilterComponent, canLoad: [AuthGuard] , canActivate:[AuthGuard] },
  { path: 'Item', component: ItemFilterComponent, canLoad: [AuthGuard] , canActivate:[AuthGuard]  },
  { path: 'Option', component: OptionFilterComponent, canLoad: [AuthGuard] , canActivate:[AuthGuard]  },
  { path: 'Kiosk', component: KioskFilterComponent , canLoad: [AuthGuard] , canActivate:[AuthGuard] },
  { path:'login-page', component: LoginPageComponent},
  { path:'modify-password', component: ModifypasswordComponent, canLoad: [AuthGuard] , canActivate:[AuthGuard] },
  { path:'User', component: UserFilterComponent, canLoad: [AuthGuard] , canActivate:[AuthGuard] },

  { path: '**', redirectTo: 'login-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
