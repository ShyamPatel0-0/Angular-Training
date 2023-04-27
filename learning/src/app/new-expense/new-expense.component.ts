import { Component, ElementRef, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MembersService } from '../services/members.service';
import { dataObject, members, people, settle, settle2 } from 'src/dataType';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent {
  private combinedSubscription: Subscription = new Subscription();

  totalPerson:number = 0;
  totalAmount:number = 0;

  //@ViewChild('ename') eName: ElementRef | undefined;
  @ViewChildren('amnt')
  amount!: QueryList<ElementRef>;

  @ViewChildren('chk') 
  check!: QueryList<ElementRef>;

  @ViewChild('amnt') amnt !: ElementRef;

  Members:members[]=[];
  paidByMembers:string[] = []

  constructor(private fb: FormBuilder, private memberService:MembersService) {}

  expense = new FormGroup({
    name: new FormControl('', {nonNullable: true}),
    paidBy: new FormControl('', {nonNullable: true}),
    distribute: this.fb.array([]),
    totalAmount: new FormControl(0, {nonNullable: true})
  })

  createDistribute(ename:string) {
    let item = this.expense.get('distribute') as FormArray;
     item.push(this.fb.group({
      name: [ename, {nonNullable: true}],
      amount: [0, {nonNullable: true}],
      isSelect: new FormControl([], {nonNullable: true}),
      userId: new FormControl(0, {nonNullable: true})
    })); 
  }

  ngOnInit():void {
    
      this.memberService.getMembers().subscribe((result)=>{
          this.Members = result;
          //console.log(this.Members);
          for (let i = 0; i < result.length; i++) {
              this.createDistribute(this.Members[i].name);      
          }  
      });
  }

  // ngOnDestroy() {
  //   console.log("welcome to ngOnDestroy");
    
    
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  //   if (this.subscription?.closed) {
  //     console.log('Subscription is closed and unsubscribed');
  //   } else {
  //     console.log('Subscription is still open');
  //   }
  // }

  
  addExpense() {    
    let subscription1 = new Subscription;
    let subscription2 = new Subscription;
    let subscription3 = new Subscription;
    this.expense.controls['totalAmount'].setValue(this.totalAmount);

    
    subscription1 = this.memberService.addExpense(this.expense.value).subscribe((result:any)=>{
       let settle:settle[] =[];
       settle = result.distribute;
       let object = <settle2[]>settle.map(({...rest})=> rest);

      setTimeout(()=>{

        
        //PaidBy Object Handle 
         subscription2 =  this.memberService.getSettleObject(result.paidBy.id).subscribe((settleObj)=>{          
            let temp:any = settleObj.settle;
            for (let i = 0; i < object.length; i++) {
              if(object[i].userId == result.paidBy.id) {
                continue;
              }
              if (!temp.find((obj:any) => obj.userId == object[i].userId)) {              
                temp.push(object[i]);                          
              } else {              
                temp.find((obj:any)=> obj.userId == object[i].userId).amount += object[i].amount;     
               // console.log(temp);

                let index = temp.findIndex((obj:settle)=>obj.userId == object[i].userId);
                //console.log(index);
                if(temp[index].amount == 0) {
                  temp.splice(temp[index],1)
                }
                //console.log(temp[index]);
                


                

                // if(temp.find((obj:any)=> obj.userId == object[i].userId).amount == 0) {
                  
                // }
                                      
              }
            }
            settleObj.settle = temp;                              
            this.memberService.distributeAmount(result.paidBy.id, settleObj).subscribe((result)=>{
              //console.log(result);        
            });
        })

      },200);

      //Need-to-Pay Handle
      let secondObj:any;
      for (let i = 0; i < object.length; i++) {
        if(object[i].userId == result.paidBy.id) {          
          secondObj = object[i];
          break;
        }        
      }

      
      setTimeout(()=>{

      

        //console.log("secondObj : ", secondObj);
        for (let i = 0; i < object.length; i++) {

          setTimeout(()=>{

            let tempObj = Object.assign({},secondObj);
 
            if(secondObj.userId != object[i].userId) {                        
              tempObj.amount = object[i].amount * -1;
            // console.log(secondObj);
                          
            subscription3 =  this.memberService.getSettleObject(object[i].userId).subscribe((settleObj)=>{
                if (!settleObj.settle.find((obj:any) => obj.userId == secondObj.userId)) {
                  //console.log(secondObj);
                  settleObj.settle.push(tempObj);
                }else {
                  settleObj.settle.find((obj:any) => obj.userId == secondObj.userId).amount += tempObj.amount;
                  //console.log(settleObj.settle);

                  let index = settleObj.settle.findIndex((obj:settle)=>obj.userId == secondObj.userId);
                  if(settleObj.settle[index].amount == 0) {
                    settleObj.settle.splice(settleObj.settle[index],1)
                  }
                  
                }

                //console.log("settleObj : ", settleObj);
                // console.log(object[i]);
                
                this.memberService.payTo(object[i].userId, settleObj).subscribe((result)=>{
                  //console.log(result);
                  
                })
              })

            }

            // subscription3.unsubscribe();

          },i*150);
                                       
        }

      },400);

    });

    this.memberService.loadHistory?.emit();

    
    this.memberService.loadMember?.emit();
    
    

    this.expense.reset();   
    this.tAmount = [0];
    this.totalAmount = 0;
    this.totalPerson = 0;   
    
    //console.log(this.amount.toArray()[id].nativeElement.disabled = true);
    for (let i = 0; i < this.amount.toArray().length; i++) {
      this.amount.toArray()[i].nativeElement.disabled = true;      
    }

    //this.combinedSubscription.add(subscription1);
    this.combinedSubscription.add(subscription2);
    this.combinedSubscription.add(subscription3);
                  

    // this.combinedSubscription.unsubscribe();

    // if (this.combinedSubscription?.closed) {
    //   console.log('combinedSubscription is closed and unsubscribed');
    // } else {
    //   console.log('combinedSubscription is still open');
    // }
    
  }

  

  get memberControl() {
    return <FormArray>this.expense.get('distribute');
  }

  get allcontrols() {
    return this.expense.controls.distribute.controls;
  }

  onCheckboxChange(amount:HTMLInputElement , id:number) { 
    
    if(this.allcontrols[id].get('isSelect')?.value.length) {
      amount.style.pointerEvents = 'fill';
      this.amount.toArray()[id].nativeElement.disabled = false;
     
      
      
    } else {
      //amount.style.pointerEvents = 'none';

      this.amount.toArray()[id].nativeElement.value = 0;
      this.amount.toArray()[id].nativeElement.disabled = true;
      
      this.calcAmount(id, 'uncheck');
    }

    if(this.expense.value.distribute) {
      let totalPerson : any[] = this.expense.value.distribute;
      //console.log("HERE : ",this.expense.value.distribute);
      this.totalPerson = 0 ;
      for (let i = 0; i < this.expense.value.distribute.length; i++) {
        
        
        
        
         if(totalPerson[i].isSelect[0] == 'true') {
          this.totalPerson += 1; 
         }
      }
    } 
    //console.log("------------------------------------------");
    //console.log(this.expense.value);
  }

  tAmount:number[] = [0];
  calcAmount(id:number, $event:any) {

    if($event != 'uncheck') {

      if(!this.allcontrols[id].get('isSelect')?.value.length){
        this.tAmount[id] = 0
      } else {
        this.tAmount[id] = Number($event.target.value);
      }
      
      this.totalAmount = 0;
      for (let i = 0; i < this.tAmount.length; i++) {
          if(this.tAmount[i]) {
            this.totalAmount += this.tAmount[i];
          }
      }

    } else {
      this.totalAmount -= this.tAmount[id];
      this.tAmount[id] = 0
    }

    this.memberControl.controls[id].value.userId = this.Members[id].id;
    //console.log(this.memberControl.controls[id].value);
    
  }


}