import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Training';
  list: any[] = [];
  id: number = 0;
  addTask(item: string) {
    this.list.push({
      id: this.id,
      name: item,
    });
    console.log(this.list);
    this.id++;
  }
  removeTask(id: number) {
    this.list = this.list.filter((item) => item.id !== id);
  }
}
