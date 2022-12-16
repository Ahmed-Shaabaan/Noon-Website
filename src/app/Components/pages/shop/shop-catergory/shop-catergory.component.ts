import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { IBrand } from 'src/app/Models/IBrand';
import { ICategory } from 'src/app/Models/ICategory';
import { Iproduct } from 'src/app/Models/iproduct';
import { ShopParams } from 'src/app/Models/ShopParams';
import { ProductService } from 'src/app/Services/product/product.service';
import { ShopService } from '../ShopServices/shop.service';

@Component({
  selector: 'app-shop-catergory',
  templateUrl: './shop-catergory.component.html',
  styleUrls: ['./shop-catergory.component.scss']
})
export class ShopCatergoryComponent implements OnInit,OnChanges {
  AllCategory: ICategory[] = [];
  AllBrand: IBrand[] = [];
  products: Iproduct[]=[];
  shopParams: ShopParams = new ShopParams();
  totalCount:number;
  search$!: Observable<string>;
  minValue = 0;
  categorySelected:any;
  maxValue = 100000;
  typesCount:any;
  typesCountResult: any;
  BrandsCount:any;
  id:any = 0;
  name:any="";
  name_caterogy:any="";
  BrandsCountResult: any;
  progressSpinner: boolean = true;
  selectedSortCode:string;
  constructor(private ShopService: ShopService,private spinner  : NgxSpinnerService,private ActiveRouter:ActivatedRoute, private route:Router,private Get_Product: ProductService) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
   };
  }
  sortOptions = [
    { name: 'Name, A to Z', value: 'nameAsc' },
    { name: 'Name, Z to A', value: 'nameDesc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  rangeValues: number[] = [];

  ngOnInit(): void {

    this.getCategoryIdFromUrl();
    this.getCategorynameFromUrl();
    this.name_caterogy=this.name;
    console.log(this.name);
    this.shopParams.typeId =  this.id;
    console.log(this.shopParams);
    this.getTypes();
    this.getBrands();
    this.getTypesCount();
    this.getBrandCount()
    this.getProducts() ;

  }
//   Route() {
//   this.route.navigate(['Shop',this.id])
// }

SeleCted(){
  console.log(this.categorySelected)
}
  ngOnChanges():void {


    this.shopParams.typeId =  this.id;
    this.getProducts() ;
  }
  getCategorynameFromUrl()
  {
    this.ActiveRouter.paramMap.subscribe(paramMap => {
      this.name =  paramMap.get('name')
    })
  }
  getCategoryIdFromUrl()
  {
    this.ActiveRouter.paramMap.subscribe(paramMap => {
      this.id =  paramMap.get('Category')
    })
  }

  getProducts() {
    if (this.name_caterogy == null )
           this.name_caterogy= "";
    this.Get_Product.GetAllProductsByCatergory(this.name).subscribe(
      (res) => {
        this.products = res;
       this.hideloader()
      }
    );
    // this.progressSpinner = false;
  }
  onPageChanged(event: any) {
    if (this.shopParams.pageIndex != event.page) {
      this.shopParams.pageIndex = event.page;
      this.getProducts();

    }
  }
  getTypes() {
    this.ShopService.getTypes().subscribe({
      next: res => { this.AllCategory = [{ id: 0, name: "All" }, ...res]; },
      error: err => { console.log(err); }
    })
  }


  getBrands() {
    this.ShopService.getBrands().subscribe({
      next: res => { this.AllBrand = [{ id: 0, name: "All" }, ...res]; },
      error: err => { console.log(err); }
    })
  }


  onTableDataChange(event: any) {
    this.shopParams.pageIndex  = event;
    this.getProducts();

  }



   hideloader() {

  this.progressSpinner =false;
   }
   getTypesCount() {
     this.ShopService.getTypesCount().subscribe({
       next: res => { this.typesCount = res; this.typesCountResult = this.typesWithCount() },
       error: err => { console.log(err); }
     })
   }
   typesWithCount() {
     const map = new Map();
     this.AllCategory.forEach(item => map.set(item.id, item));
     this.typesCount.forEach(item => map.set(item.id, { ...map.get(item.id), ...item }));
     let mergedArr = Array.from(map.values());
     return mergedArr;
   }


   getBrandCount() {
    this.ShopService.getBrandsCount().subscribe({
      next: res => { this.BrandsCount = res; this.BrandsCountResult = this.BrandsWithCount() },
      error: err => { console.log(err); }
    })
  }
  BrandsWithCount() {
    const map = new Map();
    this.AllBrand.forEach(item => map.set(item.id, item));
    this.BrandsCount.forEach(item => map.set(item.id, { ...map.get(item.id), ...item }));
    let mergedArr = Array.from(map.values());
    return mergedArr;
  }

  onTypeSelected(event:any){

    this.shopParams.typeId = parseInt( event.value["id"]);
    this.shopParams.pageIndex = 1;
    this.getProducts();

  }
  onBrandSelected(event:any){

    this.shopParams.brandId = event.value["id"];
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  FilterByPrice()
  {
    this.shopParams.priceFrom =this.minValue;
    this.shopParams.priceTo =this.maxValue;
    this.getProducts();
  }
  SortBy(event:any){

    this.shopParams.sort = event.value["value"];
    this.getProducts();
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

