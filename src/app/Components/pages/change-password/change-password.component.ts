import { ICartProduct } from './../../../Models/icart-product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IChangePassword } from 'src/app/Models/changePassword';
import { IUser } from 'src/app/Models/iuser';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  user: any = {};
  myPassword: IChangePassword ={} as IChangePassword;

  passFormGroup: FormGroup;
  show: string = 'password';
  eye: string = 'fa fa-eye-slash';
  username:any;
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
    this.passFormGroup = this.fb.group({
          oldPassword: ['', [Validators.required]],
          newPassword: ['', [Validators.required, Validators.minLength(4)]],
          confirmNewPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void {
    console.log(this.user);

  }

  get f() {
    return this.passFormGroup.controls;
  }
  get oldPassword() {
    return this.passFormGroup.get('oldPassword');
  }
  get newPassword(){
    return this.passFormGroup.get('newPassword');
  }
  get confirmNewPassword() {
    return this.passFormGroup.get('confirmNewPassword');
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

   changePassword() {
    //  this.myPassword = this.passFormGroup.value;
     this.myPassword = {
       CurrentPassword : this.passFormGroup.value.oldPassword,
       NewPassword: this.passFormGroup.value.newPassword,
       ConfirmNewPassword: this.passFormGroup.value.confirmNewPassword

    }

     this.userService.changePassword(this.myPassword).subscribe((usr) => {
       this.user = usr;
     });

    console.log( this.user);
    alert(`${this.user.username} is updated`);
    this.router.navigate(['/userProfile']);
   }


}
