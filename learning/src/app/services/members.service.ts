import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {dataObject, members, settle, settle2} from '../../dataType';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  public loadHistory:EventEmitter<any> | null = new EventEmitter() ;
  public loadMember:EventEmitter<any> | null = new EventEmitter() ;

  constructor(private http:HttpClient) { }

  getMembers() {
    return this.http.get<members[]>('http://localhost:3000/members');
  }

  addExpense(item:any) {
    let temp = [];
    
    for (let i = 0, j = 0; i < item.distribute.length; i++) {
        if(item.distribute[i].isSelect.length) {
          delete item.distribute[i].isSelect;
          temp[j] = item.distribute[i]; 
          j++;
        }
    }
    item.distribute = temp;

    let dt = new Date();
     item.date = dt.toDateString();

    //console.log(item);

    return this.http.post('http://localhost:3000/expense',item);
  }

  getExpense() {
    return this.http.get<dataObject[]>('http://localhost:3000/expense')
  }

  distributeAmount(paidBy:number, settle:settle2[],  ) {
      return this.http.put(`http://localhost:3000/settleUp/${paidBy}`, settle);
  }

  payTo(pay:number, settle:settle2[],  ) {
    return this.http.put(`http://localhost:3000/settleUp/${pay}`, settle);
}

  getSettleObject(id:number) {
    return this.http.get<any>(`http://localhost:3000/settleUp/${id}`);
  }

  getSettleUp() {
    return this.http.get('http://localhost:3000/settleUp');
  }

  updateSettleUp(member:number, settle:any) {
    return this.http.put(`http://localhost:3000/settleUp/${member}`, settle);
  }


}
