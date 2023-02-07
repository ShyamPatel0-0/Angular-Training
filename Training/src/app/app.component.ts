import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training';

  users = [
    {
      name: 'Anil',
      email: 'anil@test.com',
      phone: '8888',
      accounts: ['facebook', 'instagram', 'gmail'],
    },
    {
      name: 'Pranav',
      email: 'pranav@test.com',
      phone: '1111',
      accounts: ['youtube', 'instagram', 'gmail'],
    },
    {
      name: 'Shyam',
      email: 'shyam@test.com',
      phone: '5555',
      accounts: ['linkedIn', 'instagram', 'gmail'],
    },
    {
      name: 'Raj',
      email: 'raj@test.com',
      phone: '6666',
      accounts: ['Twitter', 'instagram', 'gmail'],
    },
  ];
}
