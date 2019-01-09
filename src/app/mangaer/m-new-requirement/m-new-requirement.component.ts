import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-new-requirement',
  templateUrl: './m-new-requirement.component.html',
  styleUrls: ['./m-new-requirement.component.scss']
})
export class MNewRequirementComponent implements OnInit {

  message: boolean;

  constructor() {
    this.message = false;
  }

  ngOnInit() {
  }
  showMessage() {
    alert('ahsdg');
    this.message = true;
  }

}
