import { Component, OnInit } from '@angular/core';
import { NewRequirementService } from 'src/app/services/new-requirement.service';
import { NewRequirement } from 'src/app/modules/new-requirement-module';
import { Router } from '@angular/router';

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
  
  

  constructor(private newRequirementService: NewRequirementService, private router: Router) {    
    this.newRequirement = new NewRequirement();
  }

  ngOnInit() {
    this.getDepartment();
    this.getManager();
    this.getPresets();
    
    this.getJdFile();
    this.getMachTestFile();
    this.getAptiFile();
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
    this.newRequirementService.getPresets().subscribe((response) => {
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

  savePreset(){
    alert("location" + this.newRequirement.location);
    this.newRequirementService.createNewRequirement(this.newRequirement).subscribe((response) => {
      console.log(response);
      alert('New Requirement successfully saved');
    }, (error) =>{
      console.log(error);
    })
  }
}
