import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IUser } from './Models/iuser';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentLang: string = '';
  currentUser$: Observable<IUser>;
  user:string;
  returnUrl: string;
  constructor(
    private router:Router,
    public translate: TranslateService,
    private accountService: UserService,
    private route: ActivatedRoute,

  ) {
    this.user = localStorage.getItem("username")||"";
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "";

    if(this.returnUrl.length > 2)
    {
      this.router.navigateByUrl(this.returnUrl);
      // console.log(this.returnUrl)
    }
    // console.log("returnUrl FROM AppComponent",this.returnUrl )
    // console.log("From App comp Constr")
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);



  }

  title = 'E-commerce';
  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
  }
  ngOnInit(): void {
    // console.log("From App comp Onit")
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(
        () => {},
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
