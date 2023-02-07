import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training';
  
  color = 'pink';
  bgcolor = 'green';
  updateColor() {
    this.color = 'blue';
    this.bgcolor = 'red';
  }
}
