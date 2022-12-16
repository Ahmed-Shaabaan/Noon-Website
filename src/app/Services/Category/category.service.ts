import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/Models/ICategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private httClient : HttpClient) {

   }
  GetAllCategoriesFromApi():Observable<ICategory[]>
  {
    return this.httClient.get<ICategory[]>(`${environment.URl}/Category/AllCategories`)
  }
 
}
