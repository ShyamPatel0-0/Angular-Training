import { Component, ElementRef, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MembersService } from '../services/members.service';
import { members, people } from 'src/dataType';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent {
  totalPerson:number = 0;
  totalAmount:number = 0;
  //@ViewChild('ename') eName: ElementRef | undefined;
  @ViewChild('amnt')
  amount!: QueryList<ElementRef>;

  Members:members[]=[];
  paidByMembers:string[] = []

  constructor(private fb: FormBuilder, private memberService:MembersService) {}

  expense = new FormGroup({
    name: new FormControl(''),
    paidBy: new FormControl(''),
    distribute: this.fb.array([])
  })

  createDistribute(ename:string) {

    let item = this.expense.get('distribute') as FormArray;
     item.push(this.fb.group({
      name: [ename, Validators.required],
      amount: [0, Validators.required],
      isSelect: new FormControl([])
    })); 
  }

  ngOnInit():void {
      this.memberService.getMembers().subscribe((result)=>{
          this.Members = result;
          console.log(this.Members);
          for (let i = 0; i < result.length; i++) {
              this.createDistribute(this.Members[i].name);      
          }  
      });
  }

  ngOnChange(changes: SimpleChanges ) {
      console.log('holla');
      console.log(changes);
      
      
  }

  addExpense() {
    console.log(this.expense.value);

    
    // if(this.expense.value.distribute) {
    //   //console.log(this.expense.value.distribute[0]);
    //   let totalPerson : any[] = this.expense.value.distribute;
    //   this.totalPerson = 0 ;
    //   for (let i = 0; i < this.expense.value.distribute.length; i++) {
        
        
    //      if(totalPerson[i].isSelect[0] == 'true') {
    //       this.totalPerson += 1; 
    //      }
        
    //   }
    //   console.log("total person : ",this.totalPerson);
      
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
      
    } else {
      amount.style.pointerEvents = 'none';
      console.log('value : ',amount.value);
      
      this.calcAmount(id, 'uncheck');
    }


    if(this.expense.value.distribute) {
      //console.log(this.expense.value.distribute[0]);
      let totalPerson : any[] = this.expense.value.distribute;
      this.totalPerson = 0 ;
      for (let i = 0; i < this.expense.value.distribute.length; i++) {
        
        
         if(totalPerson[i].isSelect[0] == 'true') {
          this.totalPerson += 1; 
         }
        
      }
      // console.log("total person : ",this.totalPerson);
      
    } 



  }

  tAmount:number[] = [0]
  calcAmount(id:number, $event:any) {
    console.log('id : ', id);
    //console.log($event.target.value);
    

   
      // this.amount.forEach((input: ElementRef, index: number) => {
      //   console.log(`Input ${index}: ${input.nativeElement.value}`);
      // });

    // console.log('Amount : ',this.amount?.nativeElement.value);
    if($event != 'uncheck') {
      if(!this.allcontrols[id].get('isSelect')?.value.length){
        this.tAmount[id] = 0
      } else {
        this.tAmount[id] = Number($event.target.value);
      }
  
      console.log(this.tAmount);
      
      this.totalAmount = 0;
      for (let i = 0; i < this.tAmount.length; i++) {
          
          if(this.tAmount[i]) {
          
            this.totalAmount += this.tAmount[i];
          }
        }
    } else {
      this.tAmount[id] = 0
    }
    


    
  }

}


