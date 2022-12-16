import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/iuser';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  user: any = {};
  updatedUser: IUser = {} as IUser;
  uEmail: any;
  Foundeduser: any = [];
  usrFormGroup: FormGroup;
  emailPattern: string = '[a-zA-Z0-9+_.-]+@gmail.com';
  myPassword: any;
  show: string = 'password';
  eye: string = 'fa fa-eye-slash';
  username:any;
  linkPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{10,256}/;
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.username=localStorage.getItem('username');
    this.userService.getuserbyusername(this.username).subscribe(
      (res) => {
        this.user = res;
      }
    );
    this.usrFormGroup = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      LastName: ['', [Validators.required, Validators.minLength(3)]],
      UserName: ['', [Validators.required, Validators.minLength(5)]],
      Email: ['', Validators.required],
      PhoneNumber:['',Validators.required]
    });
  }

  get f() {
    return this.usrFormGroup.controls;
  }
  get FirstName() {
    return this.usrFormGroup.get('FirstName');
  }
  get UserName(){
    return this.usrFormGroup.get('UserName');
  }
  get LastName() {
    return this.usrFormGroup.get('LastName');
  }

  get Email() {
    return this.usrFormGroup.get('Email');

  }
  get PhoneNumber() {
    return this.usrFormGroup.get('PhoneNumber');
  }

  // get address() {
  //   return this.usrFormGroup.get('address');
  // }

   //get Password() {
    // return this.usrFormGroup.get('Password');
   //}
  // get ConfirmPassword() {
    // return this.usrFormGroup.get('ConfirmPassword');
   //}

  // toggle() {
    // if (this.show == 'text') {
    //   this.show = 'password';
    //   this.eye = 'fa fa-eye-slash';
    // } else {
     //  this.show = 'text';
     //  this.eye = 'fa fa-eye';
    // }
   //}

  updateUser() {
    this.updatedUser = this.usrFormGroup.value;
    console.log(this.user);
    this.updatedUser.userId=this.user.userId;
    console.log(this.updatedUser);
    this.userService.updateUser(this.updatedUser).subscribe((usr) => {
      this.user = usr;
    });

    console.log( this.user);
    alert(`${this.user.UserName} is updated`);
    this.router.navigate(['/userProfile']);
  }


    ngOnInit(): void {}
    ngOnChanges(): void {}
}

