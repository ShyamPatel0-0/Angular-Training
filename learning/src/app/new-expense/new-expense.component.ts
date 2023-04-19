import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent {

  constructor(private fb: FormBuilder) {}

  expense = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    paidBy: new FormControl(''),
    distribute: this.fb.array([
      
    ])
  })

  paidByFriends = [
    'shyam',
    'pranav',
    'ruchit',
    'meet',
    'dhruvil',
    'raj'
  ];

}
