import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order, OrderMassege } from 'src/app/Models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  product:Object[]=[];
  ProductID:any[]=[];
  Quantity:any[]=[];
  orderdetails:Order[]=[] ;
  private http_options = {};
  constructor(private httpclinet: HttpClient) {
    this.http_options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

   }
   CreateOrder(order: Order ,token:string): Observable<OrderMassege> {
    console.log("From OrderService:",order)
    // let token = localStorage.getItem('token');
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
     headers = headers.set('Authorization', `Bearer ${token}`)
    return this.httpclinet.post<OrderMassege>(`https://localhost:7289/api/Order/Create_Order`,JSON.stringify(order),{headers})
  }

  getOrders(id: any): Observable<Order>
  {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
     headers = headers.set('Authorization', `Bearer ${token}`)
      return this.httpclinet.get<Order>(`https://localhost:7289/api/Order/get_order?id_user=${id}`,{ headers })
  }
}
