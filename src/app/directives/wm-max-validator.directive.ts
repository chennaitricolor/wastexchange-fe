import { Directive, HostListener, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[wmMax]"
})
export class WmMaxDirective {
  @Input() wmMax: number;
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }
  @HostListener("input", ["$event"]) onchange(event: any) {
    let value = this.el.value;
    let isValid = parseInt(value) >= 0 && parseInt(value) <= this.wmMax;
    if (!isValid) {
      value = value.substr(0, value.length - 1);
      this.el.value = value;
    }
  }
}
