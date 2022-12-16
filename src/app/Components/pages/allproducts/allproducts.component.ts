import { ShopService } from './../shop/ShopServices/shop.service';
import { ShopParams } from './../../../Models/ShopParams';
import { Iproduct } from './../../../Models/iproduct';
import { ProductService } from './../../../Services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss']
})
export class AllproductsComponent implements OnInit {

  products: Iproduct[] = [];
  shopParams: ShopParams = new ShopParams();
  totalCount: number;

  constructor(public prod: ProductService, private router: Router, public translate: TranslateService, private ShopService: ShopService) { }
  ngOnInit(): void {

    this.getProducts();

    //let x = this.prod.GetAllProducts().subscribe(prd => this.products = prd)
    console.log(this.products);
  }

  ShowProductDetails(productid: any): void {

    let id = this.router.navigate(['ProductDetails', productid]);
    console.log(id);
  }

  getProducts() {

    this.ShopService.getProducts(this.shopParams).subscribe(
      (res) => {
        this.products = res.data;
        this.shopParams.pageIndex = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
        //  this.hideloader()
      }
    );
  }
}
