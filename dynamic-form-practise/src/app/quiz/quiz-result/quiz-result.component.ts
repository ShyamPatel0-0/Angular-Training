import { Component } from '@angular/core';
import { McqServiceService } from '../services/mcq-service.service';


@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent {
  marks:number = 0;
  total:number = 0;

  constructor(private mcq:McqServiceService) {}

  ngOnInit():void {
    this.mcq.getMarksAchived().subscribe((result:any)=>{
      if(result) {
        this.marks = result;
        console.log(result);
      }
    });
    this.mcq.getTotal().subscribe((result)=>{
      this.total = result;
    })
  }
  close() {
    this.mcq.dataSubmitted(false);
  }
  retake() {
    window.location.reload();
  }

}
