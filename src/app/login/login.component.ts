import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../services/user-login.service';
import { User } from '../modules/user-login-module'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  message: boolean;
  verifyMessage: boolean;
  userEmail: any;
  userRole = [];
  password: any;
  confirm_password: any;


  constructor(private userLoginService: UserLoginService) {
    this.user = new User();
    this.message = false;
    this.verifyMessage = false;
  }

  ngOnInit() {
    this.getUserRole();

  }
  validatePassword() {
    const res = <HTMLInputElement>document.getElementById('cPassword');
    this.password = this.user.userPassword;
    this.confirm_password = this.user.userConfirmPassword;
    if (this.password != res.value) {
      res.setCustomValidity("Passwords Don't Match");
    } else {
      res.setCustomValidity('');
    }
  }
  userAccount() {
    this.message = true;
  }
  createAccount() {
    this.message = false;
    this.verifyMessage = true;
    this.user.userEmail = this.userEmail;
    debugger;
    this.userLoginService.createNewAccount(this.user).subscribe((response) => {
      console.log('respose is' + response);
      if (response) {
        debugger;
        this.userLoginService.sendVerificationEmail(this.user).subscribe((response) => {
          console.log(response);
        }, (error) => {
          console.log('error is' + error);
        })
      }

    }, (error) => {
      console.log('error is' + error);
    })
  }
  getUserRole() {
    this.userLoginService.getUserRole().subscribe((response) => {
      debugger;
      this.userRole = JSON.parse(response["_body"]);
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }
}
