import { Component, ElementRef, ViewChild } from '@angular/core';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  

  title = 'Todo-App';
  isChecked: Array<boolean> =[];
  list: any[] = [];
  id: number = 0;
  

 addTask(item: string, $event:any) {
   // console.log($event);
    if($event.target.value == "add") {
      if(item.trim()){
        this.list.push({
            
          id: this.id,
          name: item,
        });
        this.isChecked.push(false);
        //console.log(this.list);
        this.id++;
        //console.log(this.isChecked);
        
      }
    } else {
      if(item.trim()){
        this.list[$event.target.value].name = item; 
      }
    }
    $event.target.value = "add";
    $event.target.innerHTML = "Add Task";
    $event.target.parentNode.childNodes[2].placeholder = "Enter new task";
    $event.target.parentNode.childNodes[2].value = "";
    //console.log(this.list);
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

 editTask(i: number,id: number, task:any, taskBtn:any) {
  let work=[]; 
  work= this.list[i].name; 
  task.value = work;
  task.placeholder = "Update the task";
  taskBtn.innerHTML = "Update";
  taskBtn.value = i;
    //console.log(work);
 }

 taskCompleted(e:any) {
    
    if(e.classList[0] != "taskCompleted"){
      e.classList.add("taskCompleted");
      
    }else {
      e.classList.remove("taskCompleted");
    }
 }





}
