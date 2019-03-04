import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { TestComponent } from './test/test.component';
import { MNewRequirementComponent } from './mangaer/m-new-requirement/m-new-requirement.component';
import { MDashboardComponent } from './mangaer/m-dashboard/m-dashboard.component';
import { MViewPendingReqComponent } from './mangaer/m-view-pending-req/m-view-pending-req.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HrDashboardComponent } from './hr/hr-dashboard/hr-dashboard.component';
import { HrViewCurrentOpeningComponent } from './hr/hr-view-current-opening/hr-view-current-opening.component';
import { HrAddNewCandidateComponent } from './hr/hr-add-new-candidate/hr-add-new-candidate.component';
import { HrViewCandidateComponent } from './hr/hr-view-candidate/hr-view-candidate.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { UserLoginService } from './services/user-login.service';
import { NewRequirementService } from './services/new-requirement.service';
import { DxDataGridModule } from 'devextreme-angular';
import { ViewRequirementService } from './services/view-requirement.service';
import { ModalServiceService } from './services/modal-service.service';
import { MdDashboardComponent } from './md/md-dashboard/md-dashboard.component';
import { MdViewRequirementComponent } from './md/md-view-requirement/md-view-requirement.component';
import { SearchComponent } from './candidate-lookup/search/search.component';
import { AddNewCandidateComponent } from './candidate-lookup/add-new-candidate/add-new-candidate.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'm-new-requirement', component: MNewRequirementComponent },
  { path: 'm-dashboard', component: MDashboardComponent },
  { path: 'm-view-req', component: MViewPendingReqComponent },
  { path: 'hr-dashboard', component: HrDashboardComponent },
  { path: 'hr-view-current-req', component: HrViewCurrentOpeningComponent },
  { path: 'hr-add-new-candidate', component: HrAddNewCandidateComponent },
  { path: 'hr-view-candidate', component: HrViewCandidateComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'md-dashboard', component: MdDashboardComponent },
  { path: 'md-view-requirement', component: MdViewRequirementComponent },
  { path: 'cl-search', component: SearchComponent },
  { path: 'cl-add-new', component: AddNewCandidateComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    TestComponent,
    MNewRequirementComponent,
    MDashboardComponent,
    MViewPendingReqComponent,
    HrDashboardComponent,
    HrViewCurrentOpeningComponent,
    HrAddNewCandidateComponent,
    HrViewCandidateComponent,
    UserProfileComponent,
    NotificationsComponent,
    LoginComponent,
    MdDashboardComponent,
    MdViewRequirementComponent,
    SearchComponent,
    AddNewCandidateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DxDataGridModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true } // <-- debugging purposes only
    ),
  ],
  providers: [
    UserLoginService,
    NewRequirementService,
    ViewRequirementService,
    ModalServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
