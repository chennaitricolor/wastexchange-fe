import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[wmMin]'
})
export class WmMinDirective {
  @Input() wmMin: number;
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }
  @HostListener('blur', ['$event']) onchange(event: any) {
    let value = this.el.value;
    !(parseInt(value) >= this.wmMin) && (this.el.value = '0');
  }
}
