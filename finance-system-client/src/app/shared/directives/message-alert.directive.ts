import { Directive, ElementRef, Input, OnChanges, Renderer, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appMessageAlert]'
})
export class MessageAlertDirective implements OnChanges {
  @Input() errorMessage: string;
  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.errorMessage.firstChange) {
      return;
    }
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.innerHTML = '&times;';
    span.classList.add('closebtn');
    this.renderer.listen(span, 'click', (event) => {
      div.style.display = 'none';
    });
    div.innerHTML = changes.errorMessage.currentValue;
    div.classList.add('alert-message');
    this.el.nativeElement.insertBefore(div, this.el.nativeElement.childNodes[0]);
    div.insertBefore(span, div.childNodes[0]);
  }
}