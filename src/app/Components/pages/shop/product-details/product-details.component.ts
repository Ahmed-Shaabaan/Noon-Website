import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Iproduct } from 'src/app/Models/iproduct';
import { IProductRate } from 'src/app/Models/ProductRate';
import { RateService } from 'src/app/Services/Rate/rate.service';
import { ShopService } from '../ShopServices/shop.service';
import {RatingModule} from 'primeng/rating';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ICartProduct } from 'src/app/Models/icart-product';
import { IUser } from 'src/app/Models/iuser';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product: Iproduct;
  id: any = 0;
  Sail:number = 0;
  quantity: number = 1;
  reviewBody: string;
  currentUser$:Observable<IUser>
  productRate:IProductRate;
  Reviews$: Observable<IProductRate>
  ratingList: boolean[] = [true, true, true, true, true];
  rating: number = 0;
//////////////////////////
  selectedProduct!: Iproduct;
  ProductQuantity: number = 1;
  p!: Iproduct;
  LocalStorageProducts: ICartProduct[] = [];

  CartProduct: ICartProduct = {
    quantity: 0,
    product: this.p,
  };
  newpro: any = {};
   myproduct: any;
   IdRecived: any;
   currentDate = new Date();
   DecreaseFromStock(newpro:any) {
    newpro.stock --;
  }

  // productReviews: IProductReviews;
  // currentUser: IUser;
  constructor(private Shopservices: ShopService,
    private router: Router, private ActiveRouter: ActivatedRoute,
    private _router: Router, private rateServices: RateService,
    private _cartService: CartService, private user :UserService
    )
  {
    this.Reviews$ = this.rateServices.Reviews$;
    this.currentUser$ = this.user.currentUser$;
  }
  async ngOnInit(): Promise<void> {

   await this.getProductId()

   await this.loadproduct()

     //console.log(this.productRate)

  }


  getProductId()
  {
    this.ActiveRouter.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id')
    })
  }


  loadproduct()
  {
    this.Shopservices.getProduct(this.id).subscribe(
      prd => this.product = prd)



       this.rateServices.getRate(this.id).subscribe(r=> this.productRate = r)

      this.rateServices.getRate(this.id).subscribe(r=> this.productRate = r)

      console.log(this.productRate)
  }

  addToCart(){
    this.CartProduct.quantity = this.quantity
    this.CartProduct.product = this.product
    console.log(this.product );
    this._cartService.addToCart(  this.CartProduct);

    console.log(this.quantity);
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  // quantity:number = 1;
  i=1;
  plus(){
    if(this.i !=10){
      this.i ++;
      this.quantity = this.i;
    }
  }
  minus(){
    if(this.i !=1){
      this.i--;
      this.quantity = this.i;
    }
  }

  setStar(data: any) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.ratingList[i] = false;
      }
      else {
        this.ratingList[i] = true;
      }
    }
    console.log(this.rating);
  }





  submitReview() {
    console.log("from component :",this.product.id, this.reviewBody, this.rating)

    this.rateServices.addReview(localStorage.getItem('token')|| '{}', this.product.id, this.reviewBody, this.rating)

      .subscribe({
        next: ((response) => {
        }
        ),
        error: ((errors) => {
          console.log(errors)
        })
      })
  }



}

