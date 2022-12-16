import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  routeURL: string;
  user:string;
  constructor( private accountService:UserService, private router: Router) {
  }

   canActivate(router,state: RouterStateSnapshot)
  {
     this.user = localStorage.getItem("username") ||""
    return this.accountService.currentUser$.pipe( map( user  => {
        if ( this.user || this.user.length > 0) {
          // console.log("I'm user ")
          return true;
        }
        else {
          console.log( this.accountService.currentUser$)
          this.router.navigate(['login'],{ queryParams : {returnUrl:state.url}});
          return false;
        }
      }
      ));

  }

}
