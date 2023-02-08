import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRedElement]',
})
export class RedElementDirective {
  @Input() color: string = '';
  constructor(private el: ElementRef, private renderer: Renderer2) {
    el.nativeElement.innerHTML = 'Focus on ';
    // el.nativeElement.style.color = color;
  }
  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.color);
  }
}
