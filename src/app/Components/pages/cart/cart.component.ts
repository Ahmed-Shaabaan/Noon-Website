import { ProductService } from './../../../Services/product/product.service';
import { Iproduct } from 'src/app/Models/iproduct';
import { Component } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CartService } from 'src/app/Services/cart/cart.service';
import { UserService } from 'src/app/Services/user.service';
import { OrderService } from 'src/app/Services/orders/order.service';
import { ICartProduct } from 'src/app/Models/icart-product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent { public payPalConfig?: IPayPalConfig;
  _order:any={};
  public products: any[] = [];
  public totalQuantity: number = 0;
  public grandTotal: number = 0;
  public request:any;
  ProductsFromCart:ICartProduct[] =[]
  showPayment$: Observable<boolean>;
  constructor(private cartService: CartService
    ,private _UserService:UserService
    ,private _productSeervice : ProductService
    ,private _orderService: OrderService) {
      // this.orderCreate();
     this.showPayment$= this._UserService.authChanged$

  }

  ngOnInit(): void {

    // this._productSeervice.GetAllProducts().subscribe(prd => this.products = prd);
    // console.log(this.products);
   this.ProductsFromCart = this.cartService.getProduct()
   this.CalculateCartPrice()
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    location.reload()
  }

  // private initConfig(): void {
  //   this.payPalConfig = {
  //     currency: 'EUR',
  //     clientId: 'AcdISVozx83WZu6AXnkTvnt16pBooEsZVhLV5jwABVuHTuez6mDPttl3wiGK4NSAAMwGdIj40VzX64TX',
  //     createOrderOnClient: (data) => <ICreateOrderRequest>{
  //       intent: 'CAPTURE',
  //       purchase_units: [{
  //         amount: {
  //           currency_code: 'EUR',
  //           value: '9.99',
  //           breakdown: {
  //             item_total: {
  //               currency_code: 'EUR',
  //               value: '9.99'
  //             }
  //           }
  //         },
  //         items: [{
  //           name: 'Enterprise Subscription',
  //           quantity: '1',
  //           category: 'DIGITAL_GOODS',
  //           unit_amount: {
  //             currency_code: 'EUR',
  //             value: '9.99',
  //           },
  //         }]
  //       }]
  //     },
  //     advanced: {
  //       commit: 'true'
  //     },
  //     style: {
  //       label: 'paypal',
  //       layout: 'vertical',
  //       color: 'blue',
  //       shape: 'rect'
  //     },
  //     onApprove: (data, actions) => {
  //       console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //       actions.order.get()

  //     },
  //     onClientAuthorization: (data) => {
  //       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);


  //     },
  //     onError: err => {
  //       console.log('OnError', err);

  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);

  //     }
  //   };





  // }

  // orderCreate(){
  //   this._order.CustomerID="14a9d59d-4826-4618-ae6c-bfa15d5f4514";
  //   this._order.street="ddddd";
  //   this._order.city ="ddddd";
  //   this._order.state="ddddd";
  //   this._order.zipcode="ddddd";
  //   this._orderService.CreateOrder(this._order).subscribe(prd=>{
  //     this.request=prd;
  //   });
  //   console.log(this.request);
  // }

  CalculateCartPrice()
  {
    for (const product of  this.ProductsFromCart) {

      if(product.product.newPrice > 0)
      {
        this.grandTotal += product.product.newPrice
      }
      else
      {
        this.grandTotal += product.product.unitPrice * product.quantity
      }
      this.totalQuantity += product.quantity
    }

  }


}
