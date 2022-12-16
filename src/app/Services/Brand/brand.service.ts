import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from 'src/app/Models/IBrand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private httClient : HttpClient) {

  }



 GetAllBrandsFromApi():Observable<IBrand[]>
 {
   return this.httClient.get<IBrand[]>(`${environment.URl}/Brand/AllBrands`)
 }
}
