import { Component } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean = true;
  authError:string = "";
  constructor(private user: UserService) {}

  ngOnInit():void {
    this.user.userAuthReload();
  }

  signUp(data:SignUp) {
    //console.log(data);
    this.user.userSignUp(data);
  }

  login(data:Login) {
    //console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result) {
        this.authError = "Please enter valid user details";
      }
    })
  }


  openLogin() {
    this.showLogin = true;
    //console.log("openLogin called : ",this.showLogin);
  }

  openSignUp() {
    this.showLogin = false;
    //console.log("OpenSignUP called : ",this.showLogin);
  }

}
