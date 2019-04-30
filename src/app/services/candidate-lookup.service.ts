import { Injectable } from '@angular/core';
import * as myGlobals from '../models/global';
import { Http } from '@angular/http';
import { Candidate } from '../models/candidate-model';



@Injectable({
  providedIn: 'root'
})
export class CandidateLookupService {
  queryUrl: string = '?search=';
  constructor(private http: Http) { }
  totalRecord(){
    return this.http.get(myGlobals.tool_API + 'totalrecord');
  }
  searchCandidate(term) {
    return this.http.get(myGlobals.tool_API + 'candidateLookupSearch?search=' + term);
  }
  pagignation(term) {
    return this.http.get(myGlobals.tool_API + 'pagignation?search=' + term);
  }
  getCLdata() {
    return this.http.get(myGlobals.tool_API + 'getCLdata');
  }
  CheckDuplicate(candidateEmail, candidatePhone){
    return this.http.get(myGlobals.tool_API + 'checkDuplicate?candidateEmail=' + candidateEmail+'&candidatePhone=' + candidatePhone);
  }
  addCandidate(candidateData) {
    return this.http.post(myGlobals.tool_API + 'addcandidateLookup', candidateData);
  }
  editCandidate(CandidateId) {
    return this.http.get(myGlobals.tool_API + 'editCandidateData?candidate=' + CandidateId);
  }
  updateCandidate(EditCandidateData) {
    return this.http.post(myGlobals.tool_API + 'updateEditCandidateData', EditCandidateData);
  }
  deleteCandidate(deleteCandidateId) {
    return this.http.post(myGlobals.tool_API + 'deleteCandidate', deleteCandidateId);
  }
  getresume(cv) {
    return this.http.get(myGlobals.tool_API + 'getResume?cv=' + cv);
  }
  convertpdf(cv){
    return this.http.get(myGlobals.tool_API + 'convertpdf?cv=' + cv);
  }
}
