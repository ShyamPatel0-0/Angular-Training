import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training';
  flag = true;
  color = 'pink';
  bgcolor = 'green';
  updateColor() {
    this.flag
      ? ((this.color = 'blue'), (this.bgcolor = 'red'), (this.flag = false))
      : ((this.color = 'pink'), (this.bgcolor = 'green'), (this.flag = true));
  }
}
