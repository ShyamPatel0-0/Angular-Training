import { Component, ViewChild   } from '@angular/core';
import {QuizCardComponent} from './quiz-card/quiz-card.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  remaining : number | undefined = 0;
  // @ViewChild(QuizCardComponent) qc: QuizCardComponent | undefined;

  // ngOnInit():void {
  //   this.remaining = 
  // }

  // ngAfterViewInit() {
  //   this.childmethod();
  //   console.log("success");
    
  // }
 
  // childmethod():void {
  //   //this.qc && this.qc.fun();
  //   this.remaining = this.qc?.qremaining;
    
    
  //   console.log("from parent : ",this.qc?.qremaining);
    
    
  // }

}
