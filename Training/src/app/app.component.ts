import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training';
  users = ['Anil', 'Pranav', 'Shyam', 'Raj'];
  userDetails = [
    { name: 'Anil', email: 'anil@test.com', phone: '8888' },
    { name: 'Pranav', email: 'pranav@test.com', phone: '1111' },
    { name: 'Shyam', email: 'shyam@test.com', phone: '5555' },
    { name: 'Raj', email: 'raj@test.com', phone: '6666' },
  ];
}
