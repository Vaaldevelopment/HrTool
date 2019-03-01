import { Injectable } from '@angular/core';
import * as myGlobals from '../modules/global';
import { Http } from '@angular/http';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ViewRequirementService {

  constructor(private http: Http) { }

  getRequirement(reqData){
    return this.http.post(myGlobals.tool_API + 'singleRequirement', reqData);
  }

  getDepartment(reqData){
    return this.http.post(myGlobals.tool_API + 'departmentName', reqData);    
  }

  getApti(reqData){
    return this.http.post(myGlobals.tool_API + 'aptiFileData', reqData);
  }

  getUser(reqData){
    return this.http.post(myGlobals.tool_API + 'userName', reqData);
  }

  getJD(reqData){
    return this.http.post(myGlobals.tool_API + 'jdFileData', reqData);
  }

  getMachTest(reqData){
    return this.http.post(myGlobals.tool_API + 'machTestFileData', reqData);
  }

  updateRequirement(reqData){
    return this.http.post(myGlobals.tool_API + 'updateRequirement', reqData);
  }

  deleteRequirement(reqData){
    return this.http.post(myGlobals.tool_API + 'deleteRequirement', reqData);
  }
}

