import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-md-view-requirement',
  templateUrl: './md-view-requirement.component.html',
  styleUrls: ['./md-view-requirement.component.scss']
})
export class MdViewRequirementComponent implements OnInit {
  editRequirement: any;
  constructor() { }

  ngOnInit() {
    this.editRequirement = false;
  }
  deleteRequirement(){

  }
  updateRequirement(){
    
  }
}
