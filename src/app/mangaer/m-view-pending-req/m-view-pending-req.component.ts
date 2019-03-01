import { Component, OnInit } from '@angular/core';
import { ViewRequirementService } from 'src/app/services/view-requirement.service';
import { NewRequirementService } from 'src/app/services/new-requirement.service';
import { ViewRequirement } from 'src/app/modules/view-requirement-module';
import { Router } from '@angular/router';
import { ModalServiceService } from 'src/app/services/modal-service.service';
declare var $:any;
@Component({
  selector: 'app-m-view-pending-req',
  templateUrl: './m-view-pending-req.component.html',
  styleUrls: ['./m-view-pending-req.component.scss']
})
export class MViewPendingReqComponent implements OnInit {

  requirement: ViewRequirement;
  tempReq = [];
  jdDoc = [];
  aptiDoc = [];
  machTest = [];
  department = [];
  manager = [];
  jdFile = [];
  aptiFile = [];
  machTestFile = [];
  location = [{name:'Pune'},{name:'Cincinati'},{name:'Uthretch'}];
  tests = [];  
  machineTestFlag = false;
  aptiDocFlag = false;
  editRequirement = false;

  constructor(private viewRequirementService: ViewRequirementService, private router: Router, private newRequirementService: NewRequirementService, private modalService: ModalServiceService) {
    this.requirement = new ViewRequirement();
    
  }

  ngOnInit() {
    this.requirement.reqId = localStorage.getItem("reqId");
    this.getSelectedRequire();
    this.getDepartment();
    this.getManager();
    this.getJdFile();
    this.getMachTestFile();
    this.getAptiFile();
    this.getTests();
  }

  getSelectedRequire(){
    this.viewRequirementService.getRequirement(this.requirement).subscribe((response) => {
      this.tempReq = JSON.parse(response["_body"]);
      this.requirement.jobTitle = this.tempReq[0].job_title;
      this.requirement.numOfPos = this.tempReq[0].no_of_pos;
      this.requirement.departmentId = this.tempReq[0].department;

      // department name
      this.viewRequirementService.getDepartment(this.requirement).subscribe((response) => {
        this.requirement.departmentName = JSON.parse(response["_body"])[0].dep_name;
      }, (error) => {
        console.log(error);
      });

      this.requirement.jobType = this.tempReq[0].job_type;
      this.requirement.budget = this.tempReq[0].budget;
      this.requirement.experience = this.tempReq[0].experience;

      //date in input accepted in yyyy/mm/dd format
      this.requirement.openingDate = this.tempReq[0].opening_date.substring(0,10);
      this.requirement.closingDate = this.tempReq[0].closing_date.substring(0,10);
      this.requirement.location = this.tempReq[0].location;
      this.requirement.jdFileId = this.tempReq[0].job_description;
      this.viewRequirementService.getJD(this.requirement).subscribe((response) => {
        this.requirement.jdFileName = JSON.parse(response["_body"])[0].job_title;
      }, (error) => {
        console.log(error);
      });
     
      this.requirement.requestToId = this.tempReq[0].request_to;

      //requested managers name
      this.viewRequirementService.getUser(this.requirement).subscribe((response) => {
        this.requirement.requestToName = JSON.parse(response["_body"])[0].user_reg_name;
      }, (error) => {
        console.log(error);
      });

      this.requirement.tests = this.tempReq[0].tests;

      if(this.requirement.tests.includes('Aptitude Test')){
        this.aptiDocFlag = true;
        this.requirement.aptiFileId = this.tempReq[0].apti_doc;
        this.viewRequirementService.getApti(this.requirement).subscribe((response) => {
          this.aptiDoc = JSON.parse(response["_body"]);
          this.requirement.aptiFileName = JSON.parse(response["_body"])[0].apti_name
        }, (error) => {
          console.log(error);
        });
      }if(this.requirement.tests.includes('Machine Test')){
        this.machineTestFlag = true;
        this.requirement.machineTestFileId = this.tempReq[0].mach_test_doc;
        this.viewRequirementService.getMachTest(this.requirement).subscribe((response) => {
          this.machTest = JSON.parse(response["_body"]);
          this.requirement.machineTestFileName = JSON.parse(response["_body"])[0].mach_test_name ;
        }, (error) => {
          console.log(error);
        });
      }

      this.requirement.notes = this.tempReq[0].additional_notes == 'undefined'? '' : this.tempReq[0].additional_notes;
      
      
      
    }, (error) => {
      console.log(error);
    })
  }

  getDepartment(){
    this.newRequirementService.getDepartment().subscribe((response) => {
      if(response){
      this.department = JSON.parse(response["_body"]);
      console.log(response);
      }
    }, (error) => {
      console.log(error);
    })
  }

  getManager() {
    this.newRequirementService.getManager().subscribe((response) => {
      this.manager = JSON.parse(response["_body"]);
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  getJdFile() {
    this.newRequirementService.getJdFile().subscribe((response) => {
      this.jdFile = JSON.parse(response["_body"]);
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  getMachTestFile() {
    this.newRequirementService.getMachTestFile().subscribe((response) => {
      this.machTestFile = JSON.parse(response["_body"]);
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  getAptiFile() {
    this.newRequirementService.getAptiFile().subscribe((response) => {
      this.aptiFile = JSON.parse(response["_body"]);
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  getTests() {
    this.newRequirementService.getTests().subscribe((response) => {
      this.tests = JSON.parse(response["_body"]);
     
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  setTests(){
    var i;
    var selected: String = "";
    for(i=0; i<this.tests.length ; i++){
      var id="#test"+this.tests[i].test_id ;
      var testStatus = $(id).prop("checked");
      if(testStatus == true){
        selected += this.tests[i].test_name + ",";
      } 
    }    
    this.requirement.tests = selected.slice(0,-1);
  }

  updateRequirement(){
    this.setTests();
    this.viewRequirementService.updateRequirement(this.requirement).subscribe((response) =>{
    alert('Requirement Updated');
    console.log(response); 
    }, (error) => {
      console.log(error);
    })
  }

  deleteRequirement(){
    
    this.viewRequirementService.deleteRequirement(this.requirement).subscribe((response) =>{
      alert('Requirement Deleted');
      console.log(response); 
      this.router.navigate(['/m-dashboard']);
      }, (error) => {
        console.log(error);
      })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}
