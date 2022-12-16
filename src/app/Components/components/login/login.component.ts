// import { FirebaseService } from 'src/app/services/firebase.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Models/iuser';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/Models/user-login';
import { ReponseUserLogin } from 'src/app/Models/reponse-user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
{
  insertedUser: UserLogin = {} as UserLogin;
  loginForm: FormGroup;
  response!:any;
  returnUrl:string
  emailPattern: string = '[a-zA-Z0-9+_.-]+@gmail.com';
  show: string = 'password';
  eye: string = 'fa fa-eye-slash';
  myUsers: any = [];
  linkPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{10,256}/;
  constructor(
    // private fireStore: FirebaseService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private accountService :UserService

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
   };
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

  }
  get f() {
    return this.loginForm.controls;
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  toggle() {
    if (this.show == 'text') {
      this.show = 'password';
      this.eye = 'fa fa-eye-slash';
    } else {
      this.show = 'text';
      this.eye = 'fa fa-eye';
    }
  }

  login() {
    this.userService.add_SignIn(this.loginForm.value).
    subscribe(user=> {

      this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "";
      if(!this.returnUrl||this.returnUrl == "" ||this.returnUrl.length == 0  )
      {
        if (user.success) {
          this.router.navigate(['Home'])
         }
      }
      else if (user.success && this.returnUrl)
      {
        console.log("Returnurl From Login Else")
        this.router.navigateByUrl(this.returnUrl);
      }
      else if(!user.success)
      {
        console.log("not success ")
        this.router.navigate(['login'])
      }

    })






      // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/members';
      // this.userService.add_SignIn(this.loginForm.value).subscribe(data => {
      //   this.router.navigateByUrl(returnUrl);
      // }, error => {
      //  console.log("faild")
      // }, () => {
      //   console.log("succse")
      // });




  //     this.userService.sendAuthStateChangeNotification(res.isAuthSuccessful);

  //     console.log('user logged in')
  //     this.router.navigateByUrl(this.returnUrl);
  //     this.response=use;


  // this.insertedUser =  this.loginForm.value;
  //   this.userService.add_SignIn(this.insertedUser).subscribe(( product)=>{
  //     this.response=product;

  //     this.router.navigate(['/Home']);
  //     });
  // })

  }
}
