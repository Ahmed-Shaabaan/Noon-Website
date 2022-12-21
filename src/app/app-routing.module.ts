import { ErrorNotFoundComponent } from './Components/pages/error-not-found/error-not-found.component';
import { ChangePasswordComponent } from './Components/pages/change-password/change-password.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/components/login/login.component';
import { RegisterComponent } from './Components/components/register/register.component';
import { CartComponent } from './Components/pages/cart/cart.component';
import { CheckoutComponent } from './Components/pages/checkout/checkout.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { MyOrderComponent } from './Components/pages/my-order/my-order.component';
import { ProductDetailsComponent } from './Components/pages/shop/product-details/product-details.component';
import { ShopCatergoryComponent } from './Components/pages/shop/shop-catergory/shop-catergory.component';
import { ShopComponent } from './Components/pages/shop/shop.component';
import { UpdateUserComponent } from './Components/pages/update-user/update-user.component';
import { UserProfileComponent } from './Components/pages/user-profile/user-profile.component';
import { AuthGuard } from './Services/AuthGuard/auth-guard.service';
import { LoggedInGuard } from './Services/logged-in.guard';

const routes: Routes = [
  { path:'', redirectTo: '/Home', pathMatch: 'full' },
  { path:'Home', component: HomeComponent },
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path:'Shop', component: ShopComponent },
  {path:'cart',component:CartComponent},
  { path:'Shop_catergory_name/:name', component: ShopCatergoryComponent },
  { path:'Shop/:Category', component: ShopComponent },
  {path:'ProductDetails/:id',component:ProductDetailsComponent},
  { path: 'userProfile', component: UserProfileComponent ,canActivate:[AuthGuard]},
  { path: 'updateUser', component: UpdateUserComponent ,canActivate:[AuthGuard]},
  { path: 'change-password',component: ChangePasswordComponent,canActivate:[AuthGuard]},
  { path: 'Checkout', component: CheckoutComponent ,canActivate:[AuthGuard]},
  { path: 'myOrders',component: MyOrderComponent,canActivate:[AuthGuard]},
  {path:'**' ,component:ErrorNotFoundComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
