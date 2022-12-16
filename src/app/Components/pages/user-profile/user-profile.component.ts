import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: any = {};
  email: any;
  username: any;

  constructor(private getuser:UserService,
    private router: Router) {
      this.username=localStorage.getItem('username');
      this.getuser.getuserbyusername(this.username).subscribe(
        (res) => {
          this.user = res;
        }
    );
    console.log(this.user);



  }

  ngOnInit(): void {}
  openUpdateForm() {
    this.router.navigate(['/updateUser']);
  }
}
