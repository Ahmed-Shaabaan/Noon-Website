import { JsonPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/Models/ICategory';
import { IUser } from 'src/app/Models/iuser';
import { CartService } from 'src/app/Services/cart/cart.service';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ProductService } from 'src/app/Services/product/product.service';
import { UserService } from 'src/app/Services/user.service';
import { NavBarSearchService } from './NavBarSearchService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
   isUserAuthenticated$: Observable<boolean> ;
  currentLang: string = "";
  products: any[] = []; //
  currentUser$:Observable<IUser>;
  isLogged: string ;
  AllCategories:ICategory[]=[];
  username:string;
  currentCartCount$:number;
  constructor(public translate: TranslateService,
    private router: Router,
    private cartService: CartService,
    private Get_Product: ProductService,
    private _UserService: UserService,
    private CategoryService: CategoryService,
    private navBarService: NavBarSearchService)
  {
    this.currentLang = localStorage.getItem('currentLang') || 'en'
    this.translate.use(this.currentLang)
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.totalItem = this.cartService.getProduct() ? this.totalItem = this.cartService.getProduct().length: this.totalItem =0
// console.log("From Navbar constructor")
    this.currentUser$ = this._UserService.currentUser$;
    this.isUserAuthenticated$ = this._UserService.authChanged$;
  }

  public totalItem: number = 0;
  ngOnInit(): void {
    this.cartService.GetProductCount().subscribe( (num) =>
    this.totalItem = num
    )
    this.CategoryService.GetAllCategoriesFromApi().subscribe(
      (obj) => (this.AllCategories = obj)
    );

    this.GetUserInfoFromLocalStorge()
    this.GetCurrantTotalProductInCart();
    this._UserService.loggedStatus;

  }

  onchange(e: any) {


    // console.log(this.products);
    this.router.navigate(['/Shop_catergory_name', e.target.value]);
    this.router.navigate(['/products', e.target.value]);

    console.log(e.target.value);
  }
  Show() {
    console.log(this.AllCategories);
  }
  changeCurrentLang(e: any) {
    let lang = e.target.innerText;
    e.target.innerText = lang == 'ar' ? 'en' : 'ar';
    this.translate.use(lang == 'ar' ? 'ar' : 'en');
    localStorage.setItem('currentLang', lang == 'ar' ? 'ar' : 'en');
  }
  logout() {
    this._UserService.logout();
  }

  GetUserInfoFromLocalStorge()
  {
    if(localStorage.getItem("username"))
    {
      this.username = localStorage.getItem("username") ||"";
    }
    if(localStorage.getItem("authChangeSub"))
    {
      this.isLogged = localStorage.getItem("authChangeSub") || ""
    }
  }

  @ViewChild("search", { static: false }) searchTerm: ElementRef;

  onSearch() {
    this.router.navigateByUrl("/Shop");
    this.navBarService.searchSource.next(this.searchTerm.nativeElement.value);
  }

  GetCurrantTotalProductInCart()
  {
    let cart = localStorage.getItem('cart')
    let list = JSON.parse(cart);
         this.totalItem= list.length;
        //  console.log( list.length)
  }

}
