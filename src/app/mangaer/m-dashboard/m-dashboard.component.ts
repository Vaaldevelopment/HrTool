import { Component, OnInit, ViewChild } from '@angular/core';
import { NewRequirementService } from 'src/app/services/new-requirement.service';
import { NewRequirement } from 'src/app/models/new-requirement-model';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-m-dashboard',
  templateUrl: './m-dashboard.component.html',
  styleUrls: ['./m-dashboard.component.scss']
})
export class MDashboardComponent implements OnInit {

  newRequirement: NewRequirement;
  pendingApprovals = [];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  constructor(private newRequirementService: NewRequirementService, private router: Router) { 
    this.newRequirement = new NewRequirement();
    this.newRequirement.userId = localStorage.getItem("userid");
  }

  ngOnInit() {

    this.getPendingApproval();
  }

  getPendingApproval() {
    this.newRequirementService.getPendingApproval(this.newRequirement).subscribe((response) => {
      if(response){
      this.pendingApprovals = JSON.parse(response["_body"]);
      console.log(response);
      }
    }, (error) => {
      console.log(error);
    })
  }

  getSelectedEntry(){
    // alert(this.dataGrid.instance.getSelectedRowsData()[0].req_id);
    localStorage.setItem('reqId',this.dataGrid.instance.getSelectedRowsData()[0].req_id);
    this.router.navigate(['/m-view-req']);
  }

}
