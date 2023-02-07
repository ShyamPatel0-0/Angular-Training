import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training is good ';
  name: string = '';
  today = Date();
  user = {
    name: 'shyam',
    age: 24,
  };
}
