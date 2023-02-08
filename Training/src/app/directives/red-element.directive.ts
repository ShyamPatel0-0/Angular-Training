import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedElement]',
})
export class RedElementDirective {
  constructor(el: ElementRef) {
    el.nativeElement.innerHTML = 'Focus on ';
    el.nativeElement.style.color = 'red';
  }
}
