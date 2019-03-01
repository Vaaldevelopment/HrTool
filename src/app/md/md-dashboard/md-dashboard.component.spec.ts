import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDashboardComponent } from './md-dashboard.component';

describe('MdDashboardComponent', () => {
  let component: MdDashboardComponent;
  let fixture: ComponentFixture<MdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
