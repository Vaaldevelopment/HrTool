import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAddNewCandidateComponent } from './hr-add-new-candidate.component';

describe('HrAddNewCandidateComponent', () => {
  let component: HrAddNewCandidateComponent;
  let fixture: ComponentFixture<HrAddNewCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAddNewCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAddNewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
