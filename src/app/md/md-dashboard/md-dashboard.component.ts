import { Component,  OnInit, ViewChild } from '@angular/core';
import { NewRequirementService } from 'src/app/services/new-requirement.service';
import { NewRequirement } from 'src/app/modules/new-requirement-module';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
  selector: 'app-md-dashboard',
  templateUrl: './md-dashboard.component.html',
  styleUrls: ['./md-dashboard.component.scss']
})
export class MdDashboardComponent implements OnInit {

  newRequirement: NewRequirement;
  awaitingApprovals = [];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  constructor(private newRequirementService: NewRequirementService, private router: Router) { 

  }

  ngOnInit() {
    this.getAwaitingApproval();
  }

  getAwaitingApproval() {
    this.newRequirementService.getAwaitingApproval().subscribe((response) => {
      if(response){
      this.awaitingApprovals = JSON.parse(response["_body"]);
      console.log(response);
      }
    }, (error) => {
      console.log(error);
    })
  }

  getSelectedEntry(){
    localStorage.setItem('reqId',this.dataGrid.instance.getSelectedRowsData()[0].req_id);
    this.router.navigate(['/m-view-req']);
  }

}
