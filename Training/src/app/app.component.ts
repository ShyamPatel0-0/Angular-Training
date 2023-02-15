import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UsersdataService} from './service/usersdata.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training';
  users:any;
  constructor(private userdata:UsersdataService) {
    userdata.users().subscribe((data)=> {
      this.users = data;
      console.log(this.users);
    });
  }

  getUserFormData(data : any) {
    console.log(data);
    this.userdata.saveUsers(data).subscribe((res) => {
      console.log(res);
    })
  }
}
