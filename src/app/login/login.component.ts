import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../services/user-login.service';
import { User } from '../modules/user-login-module';
import { Router } from '@angular/router';

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


  constructor(private userLoginService: UserLoginService, private router: Router) {
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
    this.userLoginService.createNewAccount(this.user).subscribe((response) => {
      console.log('respose is' + response);
      if (response) {
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
      this.userRole = JSON.parse(response["_body"]);
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }
  userLogin() {
    this.userLoginService.userLogin(this.user).subscribe((response) => {
      if (response) {

        this.user.userRoleId = JSON.parse(response["_body"])[0].user_reg_role;

        this.userLoginService.getRoleNameInitial(this.user).subscribe((responseRole) => {

          if (responseRole) {
            this.user.userRoleNameInitial = JSON.parse(responseRole["_body"])[0].user_role_name_initial;
            switch (this.user.userRoleNameInitial) {
              case '':
                alert('Login Failed, Please check User Name and Password.');
                break;
              case 'HR':
                this.router.navigate(['/hr-dashboard']);
                break;
              case 'MGR':
              case 'MD':
              case 'TL':
                this.router.navigate(['/m-dashboard']);
                break;
              default:
                alert('Your Role is not recognized');
            }
            
          }else{
            alert('Login information incorrect. Please re-enter the correct login and password.');
          }
        }, (error) => {
          console.log(error);
        });
      }
    }, (error) => {
      console.log(error);
    })

  }
}
