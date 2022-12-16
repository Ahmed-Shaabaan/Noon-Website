import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/ICategory';
import { CategoryService } from 'src/app/Services/Category/category.service';

@Component({
  selector: 'app-nav-bar-category',
  templateUrl: './nav-bar-category.component.html',
  styleUrls: ['./nav-bar-category.component.scss']
})
export class NavBarCategoryComponent {
  AllCategories:ICategory[]=[];
public constructor(private CategoryService:CategoryService,private route :Router)
{

}
ngOnInit(): void {
  this.CategoryService.GetAllCategoriesFromApi().subscribe(obj =>
    this.AllCategories = obj)

}

GoToShop(Category:number)
{
  this.route.navigate(['Shop',Category])
}
}
