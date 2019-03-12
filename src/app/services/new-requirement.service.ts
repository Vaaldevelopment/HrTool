import { Injectable } from '@angular/core';
import * as myGlobals from '../models/global';
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

  getPresets(reqData){
    return this.http.post(myGlobals.tool_API + 'presets', reqData);
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

  getTests(){
    return this.http.get(myGlobals.tool_API + 'tests');
  }

  createPreset(reqData) {
    return this.http.post(myGlobals.tool_API + 'newPreset', reqData);
  }

  createAwaitingRequirement(reqData){
    return this.http.post(myGlobals.tool_API + 'awaitingRequirement', reqData);
  }

  getPendingApproval(reqData){
    return this.http.post(myGlobals.tool_API + 'pendingApproval', reqData);
  } 

  getAwaitingApproval(){
    return this.http.get(myGlobals.tool_API + 'awaitingApproval');
  }
}
