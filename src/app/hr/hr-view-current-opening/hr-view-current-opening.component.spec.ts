import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewCurrentOpeningComponent } from './hr-view-current-opening.component';

describe('HrViewCurrentOpeningComponent', () => {
  let component: HrViewCurrentOpeningComponent;
  let fixture: ComponentFixture<HrViewCurrentOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrViewCurrentOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrViewCurrentOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
