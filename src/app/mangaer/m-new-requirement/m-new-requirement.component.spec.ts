import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MNewRequirementComponent } from './m-new-requirement.component';

describe('MNewRequirementComponent', () => {
  let component: MNewRequirementComponent;
  let fixture: ComponentFixture<MNewRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MNewRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MNewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
