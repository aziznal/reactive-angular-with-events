import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Displays over the element when given input is true.
 *
 * Displays an overlay that prevents the overlayed element from being interacted with.
 */
@Directive({
  selector: '[appDisabledOverlay]',
})
export class DisabledDirective implements OnChanges {
  // when true, the overlay is displayed
  @Input()
  disabled: boolean | null = true;

  constructor(private el: ElementRef<HTMLElement>) {
    this.#toggleOverlay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.#toggleOverlay();
  }

  #toggleOverlay(): void {
    if (this.disabled) {
      this.displayOverlay();
    } else {
      this.#removeOverlay();
    }
  }

  displayOverlay(): void {
    this.el.nativeElement.style.backgroundColor = '#e6e6e6';
    this.el.nativeElement.style.color = '#b8b8b8';
    this.el.nativeElement.style.pointerEvents = 'none';
  }

  #removeOverlay(): void {
    this.el.nativeElement.style.backgroundColor = '';
    this.el.nativeElement.style.color = '';
    this.el.nativeElement.style.pointerEvents = '';
  }
}
