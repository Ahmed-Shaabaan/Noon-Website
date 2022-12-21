import { IChangePassword } from './../Models/changePassword';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/Models/iuser';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../Models/user-login';
import { UserRegister } from '../Models/user-register';

@Injectable({
  providedIn: 'root',
})
export class UserService
 {

  private http_options = {};
  any:any= null

  isLoggedSubject:BehaviorSubject<boolean>;

  private currentUserSource = new BehaviorSubject<IUser>(this.any);
  currentUser$ = this.currentUserSource.asObservable();

  private authChangeSub = new BehaviorSubject<boolean>(false)
  public authChanged$ = this.authChangeSub.asObservable();
  returnUrl: string;

  constructor(private httpclinet: HttpClient, private injector: Injector, private router: Router,private route: ActivatedRoute) {
    this.http_options = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged)
  }
  public sendAuthStateChangeNotification = (Success: boolean) => {
    this.authChangeSub.next(Success);
  }


  add(new_prd:UserRegister):Observable<UserRegister>{
    return this.httpclinet.post<UserRegister>(`${environment.URl}/Customer/SignUp`,

      JSON.stringify(new_prd), this.http_options);
  }

  GetCurrantUser()
  {
    return this.currentUserSource.value;
  }

  add_SignIn(new_prd:any):Observable<IUser>{
    return this.httpclinet.
    post<IUser>(`${environment.URl}/Customer/SignIn`,JSON.stringify(new_prd),this.http_options)
    .pipe(
      map((user:IUser) =>  {
        if (user.success){

          this.currentUserSource.next(user);
          localStorage.setItem("username", user.username);
          localStorage.setItem("email", user.email);
          localStorage.setItem("token", user.token);
          localStorage.setItem("userId", user.userId);
          if (user.success){
            localStorage.setItem("authChangeSub", "true");
          }
          else{
            localStorage.setItem("authChangeSub", "false");
          }
          this.authChangeSub.next(true)
          // this.sendAuthStateChangeNotification(user.success);
        }
        return user;
      }));
  }
  public logout = () => {
    this.currentUserSource.next(this.any);

    let token = localStorage.getItem("token")
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.setItem("authChangeSub", "false");
    this.authChangeSub.next(false)
    // this.sendAuthStateChangeNotification(false);
    return this.httpclinet.get(`${environment.URl}/Customer/SignOut`,{ headers })
  }

  updateUser(usr: any): Observable<boolean> {
    // console.log(usr);
    return this.httpclinet.post<boolean>(`${environment.URl}/Customer/UpdateCustomer?id=${usr.userId}`, JSON.stringify(usr),this.http_options);
  }

  get isUserLogged():boolean {
    return (localStorage.getItem("email"))?true:false;
  }


  loggedStatus(): Observable<boolean> {
    return this.isLoggedSubject;
  }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
     headers = headers.set('Authorization', `Bearer ${token}`)

    // console.log(token)
    // console.log(headers)
    return this.httpclinet.get<IUser>(`${environment.URl}/Customer/GetCurrantUser`,{ headers }).pipe(
      map((user) => {
        if (user) {
          this.currentUserSource.next(user["model"]);
          this.sendAuthStateChangeNotification(user["model"]["success"]);
          // console.log(user)
        }
      }))
  }
  getuserbyusername(username:any): Observable<IUser> {
    // console.log(username);
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
     headers = headers.set('Authorization', `Bearer ${token}`)
    return this.httpclinet.get<IUser>(`${environment.URl}/Customer/getuserByusername?username=${username}`,{ headers });
  }


  changePassword(data: any): Observable<IChangePassword> {
    // console.log(data);

    let id :any = localStorage.getItem("userId")
    let token = localStorage.getItem('token');
    // console.log(id);

    let headers = new HttpHeaders();
     headers = headers.set('Authorization', `Bearer ${token}`)
    return this.httpclinet.post<IChangePassword>(`${environment.URl}/Customer/ChangePassword?id=${id}`, data,{ headers});
  }
}
