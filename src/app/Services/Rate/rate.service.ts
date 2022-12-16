import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject ,Observable,map } from 'rxjs';
import { IProductRate } from 'src/app/Models/ProductRate';
import { IRate } from 'src/app/Models/Rate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  any:any= null
  private currentReviews = new BehaviorSubject<IProductRate>(this.any);
  Reviews$ = this.currentReviews.asObservable();

  constructor(private httClient:HttpClient) { }
  getRate(id:number)
  {
    return this.httClient.get<IProductRate>(`${environment.URl}/Rate/getReviews/${id}`).pipe(
      map((response: IProductRate) => {
        this.currentReviews.next(response)
        // console.log(response)
        return response;
      })
    )
  }

  addReview(token: string, productId: number, Comment: string, stars: number) {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`)

    let bodyRequest = {
      productId,
      Comment,
      stars
    }
    console.log("from service :", bodyRequest)
    return this.httClient.post<IProductRate>(`${environment.URl}/Rate/AddReview`, bodyRequest, { headers }).pipe(

      map((response: IProductRate) => {
        this.currentReviews.next(response)
      })
    )
  }
}
