import { Injectable } from '@angular/core';
import * as myGlobals from '../modules/global';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NewRequirementService {

  constructor(private http: Http) { }
  
  getDepartment(){
    return this.http.get(myGlobals.tool_API + 'department');
  }

  getManager(){
    return this.http.get(myGlobals.tool_API + 'manager');
  }

  getPresets(){
    return this.http.get(myGlobals.tool_API + 'presets');
  }

  getJdFile(){
    return this.http.get(myGlobals.tool_API + 'jdFile');
  }

  getAptiFile(){
    return this.http.get(myGlobals.tool_API + 'aptiFile');
  }

  getMachTestFile(){
    return this.http.get(myGlobals.tool_API + 'machineTestFile');
  }

  createNewRequirement(reqData) {
    return this.http.post(myGlobals.tool_API + 'newRequirement', reqData);
  }
}
