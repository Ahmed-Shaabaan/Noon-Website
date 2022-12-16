import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Iproduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  products: Iproduct[] =[];
  responsiveOptions;
  constructor(public prod: ProductService, private router :Router) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  ngOnInit(): void {
    // this.prod.GetAllProductsByCatergory("Watches").subscribe(prd => this.products = prd)
    this.prod.GetAllProducts().subscribe(prd => this.products = prd)
    // console.log(this.products)
  }

  ShowProductDetails(productid: any): void {

    let id = this.router.navigate(['ProductDetails', productid]);
    // console.log(id);

  }

}
