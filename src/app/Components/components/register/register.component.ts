import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/iuser';
import { UserRegister } from 'src/app/Models/user-register';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  insertedUser: UserRegister = {} as UserRegister;
  newSellerCode: number = 0;
  registerForm: FormGroup;
  emailPattern: string = '[a-zA-Z0-9+_.-]+@gmail.com';
  show: string = 'password';
  eye: string = 'fa fa-eye-slash';
  myUsers: any = [];
  response:any;
  linkPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{10,256}/;
  constructor(
    // private fireStore: FirebaseService,
     private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // this.fireStore.getUsers().subscribe((users) => {
    //   for (let user of users) {
    //     this.myUsers.push({
    //       id: user.payload.doc.id,
    //       ...(user.payload.doc.data() as object),
    //     });
    //   }
    // });

    this.registerForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(5)]],
      LastName: ['', [Validators.required, Validators.minLength(5)]],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(5)]],
      ConfirmPassword: ['', Validators.required],
      // userType: ['', Validators.required],
      Role: 'customer'
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  get FirstName() {
    return this.registerForm.get('FirstName');
  }
  get LastName() {
    return this.registerForm.get('LastName');
  }
  get Username() {
    return this.registerForm.get('Username');
  }
  get Email() {
    return this.registerForm.get('Email');
  }
  get PhoneNumber() {
    return this.registerForm.get('PhoneNumber');
  }
  // get address() {
  //   return this.registerForm.get('address');
  // }

  get Password() {
    return this.registerForm.get('Password');
  }
  get ConfirmPassword() {
    return this.registerForm.get('ConfirmPassword');
  }
  // get userType() {
  //   return this.registerForm.get('userType');
  // }
  // get Role() {
  //   return this.registerForm.get('Role');
  // }
  toggle() {
    if (this.show == 'text') {
      this.show = 'password';
      this.eye = 'fa fa-eye-slash';
    } else {
      this.show = 'text';
      this.eye = 'fa fa-eye';
    }
  }

  // registration() {
  //   console.log(this.insertedUser);
  //   this.insertedUser = this.registerForm.value;
  //   console.log(this.insertedUser);


  // }

  registration() {
    this.insertedUser = this.registerForm.value;
    this.userService.add(this.insertedUser).subscribe((product)=>{
      this.response=product;
      this.router.navigate(['/login']);
      console.log(this.insertedUser);

    });

     const userExisit = this.myUsers.some(
      (user: any) => user.userName === this.insertedUser.UserName
    );

    if (userExisit) {
      alert('tis email registerd before');
      var confirmation = confirm('Do you really want to go to Login page?');
      if (confirmation) {
        this.router.navigate(['/login']);
      }
    } else {
      for (let i = 1; i < 100; i++) {
        if (!this.myUsers.some((user: any) => user.sellerCode === i)) {
          this.newSellerCode = i;
          break;
        }
      }
      this.insertedUser = {
        ...this.insertedUser,

      };
      console.log(this.insertedUser);
      // this.fireStore.addUser(this.insertedUser);
      console.log(this.myUsers);

      if (this.insertedUser.Role == 'customer') {
        console.log('You are customer');
        localStorage.setItem('customer', this.newSellerCode.toString());
        localStorage.setItem('email', this.insertedUser.Email);
        this.router.navigate(['/Home']);
      } else {
        console.log('You are buyer');
        localStorage.setItem('userName', this.insertedUser.UserName);
        this.router.navigate(['/Home']);
      }
    }


  }


}
