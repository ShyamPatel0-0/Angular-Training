import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mcqInterface } from './mcqInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class McqServiceService {

  constructor(private http:HttpClient) { }

  private marksAchived = new BehaviorSubject<number>(0);
  private total = new BehaviorSubject<number>(0);
  private submitted = new BehaviorSubject<boolean>(false);

  ngOnInit():void {

  }
  getData(){
    return this.http.get<mcqInterface[]>("http://localhost:3000/mcq");
  }

  isSubmitted() {
    return this.submitted;
  }

  dataSubmitted(data:boolean) {
    this.submitted.next(data);
  }

  setMarksAchived(data:number, total:number) {
    this.marksAchived.next(data);
    this.total.next(total);
    console.log("total : ",total);
    
    console.log("marksAchived : ",this.marksAchived.value);
    
  }

  getMarksAchived() {
    return this.marksAchived.asObservable();
  }

  getTotal(){
    return this.total.asObservable();
  }






}
