import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training';
  userDetails = [
    {
      name: 'Anil Sidhu',
      email: 'anil@gmail.com',
    },
    {
      name: 'Shyam Mendapara',
      email: 'shyam@gmail.com',
    },
    {
      name: 'Pranav Chanapara',
      email: 'pranav@gmail.com',
    },
  ];
}
