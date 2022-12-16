import { Iproduct } from './../../Models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httClient:HttpClient) { }
  GetAllProducts():Observable<Iproduct[]>
  {
    return this.httClient.get<Iproduct[]>(`${environment.URl}/Product/GetAllProducts`)

  }
  getProductByID(id:number): Observable<Iproduct>
  {
      return this.httClient.get<Iproduct>(`${environment.URl}/Product/GetProduct/${id}`)
  }

  GetAllProductsByCatergory(name:string):Observable<Iproduct[]>
  {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.httClient.get<Iproduct[]>(`${environment.URl}/Order/get_ProductByCatergoy?Name=${name}`,{headers})

  }
}
