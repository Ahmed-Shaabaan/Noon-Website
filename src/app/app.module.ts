import { ErrorNotFoundComponent } from './Components/pages/error-not-found/error-not-found.component';
import { AllproductsComponent } from './Components/pages/allproducts/allproducts.component';
import { LayoutComponent } from './Components/pages/layout/layout.component';
import { environment } from './../environments/environment';
import { CarouselComponentComponent } from './Components/components/carousel-component/carousel-component.component';
import { FooterComponent } from './Components/components/footer/footer.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/components/navbar/navbar.component';
import {CardModule} from 'primeng/card';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import {PaginatorModule} from 'primeng/paginator';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ListboxModule} from 'primeng/listbox';
import {CarouselModule} from 'primeng/carousel';
import {SelectButtonModule} from 'primeng/selectbutton';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { RegisterComponent } from './Components/components/register/register.component';
import { LoginComponent } from './Components/components/login/login.component';
import {RatingModule} from 'primeng/rating';
import { NavBarCategoryComponent } from './Components/components/nav-bar-category/nav-bar-category.component';
import { ShopComponent } from './Components/pages/shop/shop.component';
import {DataViewModule} from 'primeng/dataview';
import { ProductDetailsComponent } from './Components/pages/shop/product-details/product-details.component';
import { CartComponent } from './Components/pages/cart/cart.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { UserProfileComponent } from './Components/pages/user-profile/user-profile.component';
import { CarouselComponent } from './Components/pages/carousel/carousel.component';
import { UpdateUserComponent } from './Components/pages/update-user/update-user.component';
import { ShopCatergoryComponent } from './Components/pages/shop/shop-catergory/shop-catergory.component';
import { ChangePasswordComponent } from './Components/pages/change-password/change-password.component';
import { CheckoutComponent } from './Components/pages/checkout/checkout.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { MyOrderComponent } from './Components/pages/my-order/my-order.component';
import { DataTablesModule } from 'angular-datatables';
import { AreaComponent } from './Components/area/area.component';
import { CarouselCategoryComponent } from './Components/pages/carousel-category/carousel-category.component';




 //accordion and accordion tab
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    FooterComponent,
    CarouselComponentComponent,
    FilterPipe,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    NavBarCategoryComponent,
    ShopComponent,
    AllproductsComponent,
    ProductDetailsComponent,
    CartComponent,
    UserProfileComponent,
    CarouselComponent,
    UpdateUserComponent,
    ShopCatergoryComponent,
    ChangePasswordComponent,
    ErrorNotFoundComponent,
    CheckoutComponent,
    MyOrderComponent,
    AreaComponent,
    CarouselCategoryComponent,
  ],

  imports: [

    CommonModule,
    ReactiveFormsModule ,
    RadioButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    DataViewModule,
    PaginatorModule,
    CardModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ProgressSpinnerModule,
    RatingModule,
    NgxPayPalModule,
    ListboxModule,
    CarouselModule,
    SelectButtonModule,
    DataTablesModule,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
