import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spam-detection-front';
  constructor() {
  }
  tst(ev:any) {
    console.log(ev)
  }
}
