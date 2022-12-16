import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { IBrand } from 'src/app/Models/IBrand';
import { IPagination } from 'src/app/Models/IPagination';

import { ICategory } from 'src/app/Models/ICategory';
import { ShopParams } from 'src/app/Models/ShopParams';
import { environment } from 'src/environments/environment';
import { trigger } from '@angular/animations';
import { Iproduct } from 'src/app/Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httClient : HttpClient) {

  }
  getTypes():Observable<ICategory[]>
  {
    return this.httClient.get<ICategory[]>(`${environment.URl}/Category/AllCategories`)
  }
 getBrands():Observable<IBrand[]>
  {
    return this.httClient.get<IBrand[]>(`${environment.URl}/Brand/AllBrands`)
  }


  getProducts(shopParams: ShopParams) {

    let params = new HttpParams();

    //Price Filteration
    if (shopParams.priceFrom !=0) {
      params = params.append("priceFrom", shopParams.priceFrom.toString());
    }

    if (shopParams.priceFrom != 10000) {
      params = params.append("priceTo", shopParams.priceTo.toString());
    }

    if (shopParams.brandId != 0) {
      params = params.append("brandId", shopParams.brandId.toString());
    }

    if (shopParams.typeId != 0) {
      params = params.append("typeId", shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append("search", shopParams.search);
    }

    if (shopParams.color) {
      params = params.append("color", shopParams.color);
    }

    params = params.append("sort", shopParams.sort);
    params = params.append("pageIndex", shopParams.pageIndex);
    params = params.append("pageSize", shopParams.pageSize);
    console.log(`${environment.URl}/Product/GetProducts?${params}`)
    return this.httClient.get<IPagination>(`${environment.URl}/Product/GetProducts?${params}`)

  }
  getProduct(id:number){
    return this.httClient.get<Iproduct>(`${environment.URl}/Product/GetProduct/${id}`)
  }
  getTypesCount() {
    return this.httClient.get(`${environment.URl}/Product/GetTypesCount`);
  }
  getBrandsCount() {
    return this.httClient.get(`${environment.URl}/Product/GetBrandCount`);
  }

  getMaxPrice() {
    return this.httClient.get<number>(`${environment.URl}/Product/GetMaxPrice`);
  }
}
