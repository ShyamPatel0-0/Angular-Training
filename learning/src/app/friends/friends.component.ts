import { Component } from '@angular/core';
import { MembersService } from '../services/members.service';
import { members, settle } from 'src/dataType';

import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  selectedValue:string = "";
  memberAmount:number = 0;
  posFlag:number = 0;

  Members:members[] = [];

  settleObj:any[] =[];
  obj:any[]=[];
  
  constructor(private memberService:MembersService) {}
 
  ngOnInit():void {

    this.optimiseObject();

    this.memberService.getMembers().subscribe((result)=>{
        this.Members = result;        
    })

    this.memberService.loadMember?.subscribe(()=>{
        setTimeout(()=>{
          this.optimiseObject();
        },1500) 
    })

 }

 optimiseObject() {

  this.memberService.getSettleUp().subscribe((result:any)=>{   
   
    this.settleObj = result;   

    let temp:any[]=[];
    for (let i = 0; i <  this.settleObj.length; i++) {             
      temp.push( this.settleObj[i].settle);                                                
    } 
    this.obj = temp;  
  }) 

 }

  onLoad(id:number) {
    this.selectedValue = "";
    this.memberAmount = 0; 
    this.posFlag = 0;                           
  }

  onDropdownChange(event:any) {
    this.memberAmount = event.value.amount;
    if(this.memberAmount >= 0) {
      this.posFlag = 1;
    } else  {
      this.memberAmount *= -1 ;
      this.posFlag = -1;
    }
  }

  settleUp(obj:any, member:number) {
    //console.log(obj);  
    //console.log(this.selectedValue);
    //console.log(this.settleObj[member-1]);
    //console.log(member);
    
    let temp:any = this.selectedValue;
    
    
    if(temp?.amount) {        
        console.log(temp);        
        

        //changes done in 1st person        
        let index = this.settleObj[member-1].settle.findIndex((obj:settle)=>obj.userId == temp.userId);
        
        let id = temp.userId;      
        let indexTwo = this.settleObj[id-1].settle.findIndex((obj:settle)=>obj.userId == member);

        this.settleObj[member-1].settle.splice(index, 1);
        this.settleObj[id-1].settle.splice(indexTwo, 1);

        this.onLoad(1);      

        console.log(this.settleObj[member-1]);
        console.log(this.settleObj[id-1]);
                        
        this.memberService.updateSettleUp(member, this.settleObj[member-1]).subscribe((result)=>{
          // console.log(result);
          this.memberService.updateSettleUp(id, this.settleObj[id-1]).subscribe((result)=>{
            // console.log(result);
            
          })
          
        })


    }
    
    
  }
}