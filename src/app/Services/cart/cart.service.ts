import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from 'src/app/Models/iproduct';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { ICartProduct } from 'src/app/Models/icart-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: ICartProduct[] = [];
  any: any = null;
  public productList = new BehaviorSubject<ICartProduct[]>([]);
  private CountOfCartSource = new BehaviorSubject<number>(this.any);
  currentCartCount$ = this.CountOfCartSource.asObservable();
  Cart: ICartProduct;
  constructor(private httpClient: HttpClient) {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItemList = JSON.parse(cart);
      this.productList.next(this.cartItemList);
    }
  }
  getProduct(): ICartProduct[] {
    let cart = localStorage.getItem('cart');
    return (this.Cart = JSON.parse(cart));
  }

  GetProductCount(): Observable<number> {
    return this.CountOfCartSource.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: ICartProduct) {
    if (this.cartItemList.length > 0) {
      let result = this.cartItemList.some(
        (p) => p.product.id == product.product.id
      );
      switch (result) {
        case true:
          this.cartItemList.map((p) => {
            if (p.product.id == product.product.id)
            {
              p.quantity += product.quantity;
            }
          })
          break;
          default:
            this.cartItemList.push(product);
            break;
      }
    } else {
      this.cartItemList.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
    this.CountOfCartSource.next(this.cartItemList.length);
    this.getTotalPrice();
  }

  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  removeCartItem(product: ICartProduct) {
    this.cartItemList.map((p) => {
      if (p.product.id = product.product.id)
      {
        if( p.quantity > 1)
        {
          p.quantity = p.quantity - 1;
        }
        else
        {
          const index = this.cartItemList.indexOf(product);
          this.cartItemList.splice(index, 1)
        }
      }

    });
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
  }


  removeAllCartItem()
  {
    console.log("From Clear In Cart Service")
    localStorage.removeItem('cart');
    this.cartItemList.length =0
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
    this.CountOfCartSource.next(this.cartItemList.length);
    this.productList.next(this.cartItemList);
  }


}
