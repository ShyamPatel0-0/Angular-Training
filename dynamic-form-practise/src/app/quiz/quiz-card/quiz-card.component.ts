import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { McqServiceService } from '../services/mcq-service.service';
import { mcqInterface } from '../services/mcqInterface';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent {
  qremaining:number = 0;
  // counter:number = 0;
  // @Output() dataEmitter = new EventEmitter<number>();
  mcqData:mcqInterface[] = [];
  selectedValue:string[] = [];
  isDisable:boolean = false;
  
  
  constructor(private fb : FormBuilder, private mcq:McqServiceService) {}

  ngOnInit():void {
    this.getMcq(); 
   // this.dataEmitter.emit(this.qremaining);
  }

  // exercise = new FormGroup({
  //   mcq: this.fb.array([this.createQuestion()])
  // });

  // createQuestion(): any {
  //   return this.fb.control('');
  // }

  // get mcqControl() {
  //   return <FormArray>this.exercise.get('mcq');
  // }

  formSubmit() {
    //console.log("HERE : ",this.exercise.value);
    console.log("Selected values : ",this.selectedValue);

  let marks = 0;
   for (let i = 0; i < this.selectedValue.length; i++) {
      if( this.selectedValue[i] == this.mcqData[i].answer) {
        marks++;
      }
   }
   console.log(marks);
   this.setAchivedMarks(marks, this.mcqData.length);
  //  this.counter++;
   this.isDisable=true;
   this.mcq.dataSubmitted(true);
   
  }
  // fun() {
  //   console.log("hi");
    
  // }
  
  onChange() {
    console.log("change");
    console.log(this.qremaining);

    this.qremaining = this.mcqData.length - this.selectedValue.length ; 
    // this.counter = this.qremaining;
    console.log(this.selectedValue)
    
  }

  setAchivedMarks(marks:number, total:number) {
    
    
    this.mcq.setMarksAchived(marks, total);
    
  }

  getMcq(){
    this.mcq.getData().subscribe((result:mcqInterface[])=>{
      this.mcqData = result;
      this.qremaining = this.mcqData.length;
      // this.counter = this.qremaining;
      console.log("mcqData : ",this.mcqData);
    })
  }

}
