import { Component, OnInit } from '@angular/core';
import { CandidateLookupService } from 'src/app/services/candidate-lookup.service';
import { ConfigDataService } from 'src/app/services/config-data.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  //candidateLookup:CandidateLookup;
  results: any;
  searchTerm: string;
  config: string;
  configArray: any[];

  constructor(private candidateLookupService: CandidateLookupService, private configDataService: ConfigDataService,  private router: Router) {
    //this.candidateLookup = new CandidateLookup();

  }
  ngOnInit() {
    this.configFileData();
  }
  loadData() {
    this.candidateLookupService.searchCandidate(this.searchTerm)
      .subscribe(response => {
        this.results = JSON.parse(response["_body"]);
        console.log('respose is' + response);
      }, (error) => {
        console.log('error is' + error);
      });
  }

  configFileData() {
    if (localStorage.getItem('userid')) {
      this.configDataService.configData().subscribe((response) => {
        const bodyArray: [] = JSON.parse(response["_body"]);
        bodyArray.forEach(element => {
          this.config = element['config_value'];
          return;
        });
        //console.log(this.configArray);

      }, (error) => {
        console.log(error);
      })
    }
  }
  addCandidate(){
    localStorage.removeItem('EditCandidateId');
    this.router.navigate(['/cl-add-new']);
  }
  editCandidate(id){
   localStorage.setItem('EditCandidateId', id);
       console.log(localStorage.getItem('EditCandidateId'));
        this.router.navigate(['/cl-add-new']);
  }
  deleteCandidate(deleteCandidate){
    this.candidateLookupService.deleteCandidate(deleteCandidate)
      .subscribe(response => {
        $('#exampleModalCenter').modal('show');
        //this.loadData();
      }, (error) => {
        console.log('error is' + error);
      });
      (<HTMLInputElement>document.getElementById("c_search")).value = '';
      
  }
}

