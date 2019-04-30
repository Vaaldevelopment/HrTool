import { Component, OnInit } from '@angular/core';
import { CandidateLookupService } from 'src/app/services/candidate-lookup.service';
import { ConfigDataService } from 'src/app/services/config-data.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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
  resumePath: any;
  rowcount:any;
  resultsPag: any;
  totalrecord: any;

  constructor(private candidateLookupService: CandidateLookupService, private configDataService: ConfigDataService, private router: Router,
    private sanitizer: DomSanitizer
  ) {
    //this.candidateLookup = new CandidateLookup();

  }
  ngOnInit() {
    this.configFileData();
    this.totalrecored();
    ///this.resumePath = 'http://google.com';
    //this.sanitizer = 
  }
  totalrecored(){
    this.candidateLookupService.totalRecord().subscribe((response) => {
      this.totalrecord = JSON.parse(response["_body"])[0].totalrecord;
      // bodyArray.forEach(element => {
      //   this.totalrecord = element['totalrecord'];
      //   return;
      // });
      //console.log(this.configArray);

    }, (error) => {
      console.log(error);
    })
  }
  
  loadData() {
    this.candidateLookupService.searchCandidate(this.searchTerm)
      .subscribe(response => {
        this.results = JSON.parse(response["_body"]);
        this.rowcount =this.results.length;
        console.log('respose is' + response);
      }, (error) => {
        console.log('error is' + error);
      });

    // this.candidateLookupService.pagignation(this.searchTerm).subscribe(response => {
    //   this.resultsPag = JSON.parse(response["_body"]);
    //   //this.rowcount =this.results.length;
    //   console.log('respose is' + this.resultsPag);
    // }, (error) => {
    //   console.log('error is' + error);
    // });
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
  addCandidate() {
    localStorage.removeItem('EditCandidateId');
    this.router.navigate(['/cl-add-new']);
  }
  editCandidate(id) {
    localStorage.setItem('EditCandidateId', id);
    console.log(localStorage.getItem('EditCandidateId'));
    this.router.navigate(['/cl-add-new']);
  }
  deleteCandidate(deleteCandidate) {
    var confirmDelete = confirm('Wants to delete record of ' + deleteCandidate.first_name);
    if (confirmDelete) {
      this.candidateLookupService.deleteCandidate(deleteCandidate)
        .subscribe(response => {
          //$('#exampleModalCenter').modal('show');
          $.notify(
            'Record Deleted', 'success',
            { position: 'top center' }
          );
          this.loadData();
        }, (error) => {
          console.log('error is' + error);
        });
      (<HTMLInputElement>document.getElementById("c_search")).value = '';
    }
    else {
      return false;
    }
  }
  getResume(resultData) {
    this.candidateLookupService.getresume(resultData.cv).subscribe((response) => {
      this.resumePath = JSON.parse(response["_body"]).filename;
      // this.uploader.uploadAll();
      //this.uploadFileToServer(file, candidateId, this.candidate.name);
      console.log('respose is' + this.resumePath);
    }, (error) => {
      console.log('error is' + error);
    })
  }

}

