import { Injectable } from '@angular/core';
import * as myGlobals from '../models/global';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {

  constructor(private http: Http) { }
  configData(){
    return this.http.get(myGlobals.tool_API + 'getConfigData');
  }
}
