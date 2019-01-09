import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  message: boolean;
  verifyMessage: boolean;

  constructor() {
    this.message = false;
    this.verifyMessage = false;
  }

  ngOnInit() {
  }
  createAccount() {
    this.message = true;
  }
  verifyEmail() {
    this.message = false;
    this.verifyMessage = true;
  }
}
