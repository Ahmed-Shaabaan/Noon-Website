import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-carousel-category',
  templateUrl: './carousel-category.component.html',
  styleUrls: ['./carousel-category.component.scss']
})
export class CarouselCategoryComponent {

  products:Iproduct[]=[];
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
    let cat = "Appliances";
    // this.prod.GetAllProductsByCatergory(cat).subscribe(
    //   (res) => {this.products = res;});
    this.prod.GetAllProducts().subscribe(prd => this.products = prd)
    // console.log(this.products)
  }

  ShowProductDetails(productid: any): void {

    let id = this.router.navigate(['ProductDetails', productid]);
    // console.log(id);

  }

}
