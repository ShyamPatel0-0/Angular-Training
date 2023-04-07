import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { McqServiceService } from './quiz/services/mcq-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  patientDetails : FormGroup ;
  submit:boolean = false;
  private submitted = new BehaviorSubject<boolean>(false);

  constructor(private form: FormBuilder, private mcq:McqServiceService, private route:ActivatedRoute){
    this.patientDetails = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.form.array([this.createAddress()])
    });
  }

  ngOnInit() {
    this.submitted = this.mcq.isSubmitted();

    this.submitted.subscribe((newState)=>{
      this.submit = newState;
    })


  }



  createAddress(): FormGroup {
    return this.form.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: this.form.array([this.createPhone()])
    })
  }

  createPhone(): FormGroup {
    return this.form.group({
      type:  ['', Validators.required],
      phoneNumber :  ['', Validators.required]
    })
  }

  addPhoneItem(address:number): void {
    const items =  this.phoneControl(address);
    items.push(this.createPhone());
  }
  removePhoneItem(address:number,index:number) {
    const items =  this.phoneControl(address);
    items.removeAt(index);
    //console.log(items.value);
  }

  addItem(): void {
    const items = this.patientDetails.get('address') as FormArray;
    items.push(this.createAddress());
  }

  removeItem(index: number): void {
    const items = this.patientDetails.get('address') as FormArray;
    items.removeAt(index);
  }

  get addressControl() {
    return <FormArray>this.patientDetails.get('address');
  }

  phoneControl(i:number) {
    return <FormArray>this.addressControl.controls[i].get('phone');
  }





  formSubmit(){
    console.log(this.patientDetails.value);
  }
}
