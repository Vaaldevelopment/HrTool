import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCandidateComponent } from './add-new-candidate.component';

describe('AddNewCandidateComponent', () => {
  let component: AddNewCandidateComponent;
  let fixture: ComponentFixture<AddNewCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
