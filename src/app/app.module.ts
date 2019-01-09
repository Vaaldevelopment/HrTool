import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { TestComponent } from './test/test.component';
import { MNewRequirementComponent } from './mangaer/m-new-requirement/m-new-requirement.component';
import { MDashboardComponent } from './mangaer/m-dashboard/m-dashboard.component';
import { MViewPendingReqComponent } from './mangaer/m-view-pending-req/m-view-pending-req.component';
import { FormsModule } from '@angular/forms';
import { HrDashboardComponent } from './hr/hr-dashboard/hr-dashboard.component';
import { HrViewCurrentOpeningComponent } from './hr/hr-view-current-opening/hr-view-current-opening.component';
import { HrAddNewCandidateComponent } from './hr/hr-add-new-candidate/hr-add-new-candidate.component';
import { HrViewCandidateComponent } from './hr/hr-view-candidate/hr-view-candidate.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
export const appRoutes: Routes = [
  { path: '', component: HeaderNavComponent },
  { path: 'test', component: TestComponent },
  { path: 'm-new-requirement', component: MNewRequirementComponent },
  { path: 'm-dashboard', component: MDashboardComponent },
  { path: 'm-view-req', component: MViewPendingReqComponent },
  { path: 'hr-dashboard', component: HrDashboardComponent },
  { path: 'hr-view-current-req', component: HrViewCurrentOpeningComponent },
  { path: 'hr-add-new-candidate', component: HrAddNewCandidateComponent },
  { path: 'hr-view-candidate', component: HrViewCandidateComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'notifications', component: NotificationsComponent }
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
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true } // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
