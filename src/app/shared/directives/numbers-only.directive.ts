import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]',
  standalone: true
})
export class NumbersOnlyDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    const filtered = input.value.replace(/[^0-9]/g, '');

    if (input.value !== filtered) {
      input.value = filtered;
      input.dispatchEvent(new Event('input')); // keep Angular form in sync
    }
  }
}
