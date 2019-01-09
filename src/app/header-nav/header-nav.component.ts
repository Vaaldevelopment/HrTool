import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  notificationBell: boolean;
  constructor() {
    this.notificationBell = true;
  }

  ngOnInit() {
  }
  showBellNotification() {
    this.notificationBell = false;
  }

}

declare var $: any;

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('active');
  });
});
