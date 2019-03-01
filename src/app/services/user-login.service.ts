import { Injectable } from '@angular/core';
import * as myGlobals from '../modules/global';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: Http) {

  }
  createNewAccount(userData) {
    return this.http.post(myGlobals.tool_API + 'userRegistration', userData);
  }
  getUserRole() {
    return this.http.get(myGlobals.tool_API + 'userRole');
  }
  sendVerificationEmail(userDetails) {
    return this.http.post(myGlobals.tool_API + 'sendEmail' , userDetails)
  }
  userLogin(userLoginDetails){
    return this.http.post(myGlobals.tool_API + 'userLogin', userLoginDetails)
  }

  getRoleNameInitial(userRoleId){
    return this.http.post(myGlobals.tool_API + 'getRoleNameInitial', userRoleId);
  }
  getDepartment(){
    return this.http.get(myGlobals.tool_API + 'department');
  }
}
