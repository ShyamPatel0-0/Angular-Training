import { Component } from '@angular/core';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  isChecked: Array<boolean> =[];
  list: any[] = [];
  id: number = 0;
  

 addTask(item: string) {
  this.list.push({
         
         id: this.id,
         name: item,
  });
  this.isChecked.push(false);
  console.log(this.list);
  this.id++;
  console.log(this.isChecked);
  }

  removeTask(i: number,id: number) { 
      if(this.isChecked[i]) {
        this.list = this.list.filter((item) => item.id !== id);  
      }else {
        console.log("checkbox is not checked");
      }
      
      if(this.list.length === 0)  {
        this.isChecked = [];
      }else {
        this.isChecked.splice(i,1);
      }    

 }

 status(id: number) {
  console.log(this.list.length);
  console.log(id);
  console.log(this.isChecked);
 }

 
}
