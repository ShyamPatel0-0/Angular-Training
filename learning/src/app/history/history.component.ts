import { Component } from '@angular/core';
import { MembersService } from '../services/members.service';
import { dataObject } from 'src/dataType';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  expenseHistory:dataObject[] = [];
  first: number = 0;
  rows: number = 6;

  constructor(private memberService:MembersService) {}

  ngOnInit():void {
    this.getData();
    this.memberService.loadHistory?.subscribe(()=>{
      this.getData();
    })
  }

  

  onPageChange(event:any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  getData() {
    this.memberService.getExpense().subscribe((result)=>{
      this.expenseHistory = result;
      //console.log(this.expenseHistory);      
    })
  }

}
