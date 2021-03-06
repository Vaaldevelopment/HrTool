import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  notificationBell: boolean;
  role = localStorage.getItem('role');
  userName = localStorage.getItem('username');
 
  constructor(private router: Router) {
    this.notificationBell = true;
  }

  ngOnInit() {
  }
  showBellNotification() {
    this.notificationBell = false;
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}

declare var $: any;

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('active');
  });
});
