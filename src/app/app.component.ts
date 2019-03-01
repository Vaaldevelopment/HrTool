import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HrTool';
  
  showHeader : boolean;
  constructor() {
    // if(localStorage.getItem('userid')){
    //   this.showHeader = true;
    // }
    // else{
    //   this.showHeader = false;
    // }
  }

  checkUserToken() {
    if (localStorage.getItem('userid')) {
      return true;
    }
  }
}
