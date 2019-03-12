import { Component, OnInit } from '@angular/core';
import { NewRequirementService } from 'src/app/services/new-requirement.service';
import { NewRequirement } from 'src/app/models/new-requirement-model';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-m-new-requirement',
  templateUrl: './m-new-requirement.component.html',
  styleUrls: ['./m-new-requirement.component.scss']
})
export class MNewRequirementComponent implements OnInit {

  newRequirement: NewRequirement;
  presets = [];
  department = [];
  manager = [];
  jdFile = [];
  aptiFile = [];
  machTestFile = [];
  location = [{name:'Pune'},{name:'Cincinati'},{name:'Uthretch'}];
  tests = [];  
  aptiDocFlag: boolean;
  machineTestFlag: boolean;
  message = false;
  // nestedForm: FormGroup;
  

  constructor(private newRequirementService: NewRequirementService, private router: Router) {    
    this.newRequirement = new NewRequirement();
    this.newRequirement.userId = localStorage.getItem("userid");
  }

  ngOnInit() {
    this.getDepartment();
    this.getManager();
    this.getPresets();
    
    this.getJdFile();
    this.getMachTestFile();
    this.getAptiFile();
    this.getTests();
    // this.nestedForm = this._fb.group({
    //   selectedTests: this.getTestControls()
    // });
  }

  // getTestControls(){
  //   const arr = this.tests.map(element => {
  //     return this._fb.control(false);
  //   })
  //   return this._fb.array(arr);
  // }

  // get selectedTests(){
  //   return <FormArray>this.nestedForm.get('selectedTests');
  // }

  // getSelectedTestValue(){
  //   this.newRequirement.tests = [];
  //   this.selectedTests.controls.forEach((control, i) => {
  //     if(control.value){
  //       this.newRequirement.tests.push(this.tests[i].test_name);
  //     }
  //   })
  // }

  presetSelected(){
    var i;
    for( i=0; i<this.presets.length ; i++){
      if(this.presets[i].req_id == this.newRequirement.presets){
        this.newRequirement.jobTitle = this.presets[i].job_title;
        this.newRequirement.numOfPos = this.presets[i].no_of_pos;
        this.newRequirement.department = this.presets[i].department;
        this.newRequirement.jobType = this.presets[i].job_type;
        this.newRequirement.budget = this.presets[i].budget;
        this.newRequirement.experience = this.presets[i].experience;
        this.newRequirement.openingDate = this.presets[i].opening_date.substring(0,10);
        this.newRequirement.closingDate = this.presets[i].closing_date.substring(0,10);
        this.newRequirement.location = this.presets[i].location;
        this.newRequirement.jdFile = this.presets[i].job_description;
        this.newRequirement.requestTo = this.presets[i].request_to;
        var j;
        for(j=0; j<this.tests.length; j++){       
          var id="#test"+this.tests[j].test_id ;
          if(this.presets[i].tests.includes(this.tests[j].test_name)){
            $(id).prop("checked",true);
          }
          else
            $(id).prop("checked",false);
        }
        this.newRequirement.aptiFile = this.presets[i].apti_doc;
        this.newRequirement.machineTestFile = this.presets[i].mach_test_doc;
        this.newRequirement.notes = this.presets[i].additional_notes;
        break;
      }
    }
   
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

  
  
  getPresets() {
    debugger;
    this.newRequirementService.getPresets(this.newRequirement).subscribe((response) => {
      if(response){
      this.presets = JSON.parse(response["_body"]);
      console.log(response);
      }
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
      this.newRequirement.tests = this.tests;
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
    this.newRequirement.tests = selected.slice(0,-1);
  }

  savePreset(){
    this.setTests();
    this.newRequirementService.createPreset(this.newRequirement).subscribe((response) => {
      console.log(response);
      alert('Preset saved successfully');
    }, (error) =>{
      console.log(error);
    })
  }

  getApproval(){
    this.setTests();
    this.newRequirementService.createAwaitingRequirement(this.newRequirement).subscribe((response) => {
      console.log(response);
      this.message = true;
    }, (error) =>{
      console.log(error);
    })
  }
}
