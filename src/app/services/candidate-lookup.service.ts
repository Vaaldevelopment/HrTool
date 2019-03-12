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
  searchCandidate(term){
    return this.http.get(myGlobals.tool_API + 'candidateLookupSearch?search='+term);
  }
  getCLdata(){
    return this.http.get(myGlobals.tool_API + 'getCLdata');
  }
  addCandidate(candidateData){
    return this.http.post(myGlobals.tool_API + 'addcandidateLookup', candidateData);
  }
  editCandidate(CandidateId)
  {
    return this.http.get(myGlobals.tool_API + 'editCandidateData?candidate='+CandidateId);
  }
  updateCandidate(EditCandidateData)
  {
    return this.http.post(myGlobals.tool_API + 'updateEditCandidateData', EditCandidateData)
  }
  deleteCandidate(deleteCandidateId)
  {
    return this.http.post(myGlobals.tool_API + 'deleteCandidate' , deleteCandidateId)
  }
}
