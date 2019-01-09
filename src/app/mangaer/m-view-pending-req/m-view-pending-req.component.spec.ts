import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MViewPendingReqComponent } from './m-view-pending-req.component';

describe('MViewPendingReqComponent', () => {
  let component: MViewPendingReqComponent;
  let fixture: ComponentFixture<MViewPendingReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MViewPendingReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MViewPendingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
