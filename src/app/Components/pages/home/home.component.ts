import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/Models/iuser';
import { UserService } from 'src/app/Services/user.service';
// import { FirebaseService } from 'src/app/services/firebase.service';
// import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  bestSeller: any[] = []
  allProducts:any[]=[]
  username:string;
  public isUserAuthenticated: boolean;

  currentUser$: Observable<IUser>;

  constructor(
    private router: Router,
    public translate: TranslateService
    ,private user:UserService) {

      this.currentUser$ = this.user.currentUser$
      console.log("From home comp constractour")
  }


  ngOnInit(): void {
    console.log("From home comp Onit")
    // this.user.authChanged
    // .subscribe(res => {
    //   this.isUserAuthenticated = res;
    //   console.log("currant user in Home:",this.currentUser$)
    // })
  }
  ngAfterContentChecked(): void {
    // this.allProducts = this._ProductsService.getProductsByCategorey("all");
    this.bestSeller=this.allProducts.filter((p: any) => p.rating > 4.5);

  }


  GoToShop()
  {
      this.router.navigateByUrl('Shop')
  }
   }



