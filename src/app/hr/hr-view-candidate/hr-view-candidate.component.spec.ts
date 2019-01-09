import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewCandidateComponent } from './hr-view-candidate.component';

describe('HrViewCandidateComponent', () => {
  let component: HrViewCandidateComponent;
  let fixture: ComponentFixture<HrViewCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrViewCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrViewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
