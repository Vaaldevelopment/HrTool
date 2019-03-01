import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdViewRequirementComponent } from './md-view-requirement.component';

describe('MdViewRequirementComponent', () => {
  let component: MdViewRequirementComponent;
  let fixture: ComponentFixture<MdViewRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdViewRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
