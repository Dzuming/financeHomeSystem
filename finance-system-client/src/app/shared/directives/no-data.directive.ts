import { Directive, ElementRef, OnChanges, Input } from '@angular/core';
import { RestService } from '../services/rest.service';
@Directive({
  selector: '[appNoData]'
})
export class NoDataDirective implements OnChanges {
  @Input() products: any;
  constructor(
    private el: ElementRef,
    private restService: RestService) {

  }
  ngOnChanges(changes) {
    if (changes.products.currentValue && changes.products.currentValue.length === 0) {
      this.errorBehavior(this.el, 'add');
    } else if (changes.products.previousValue && changes.products.previousValue.length === 0 && changes.products.currentValue.length !== 0) {
      this.errorBehavior(this.el, 'remove');
    }
  }
  errorBehavior(element, behavior) {
    element.nativeElement.classList[behavior]('no-data');
  }
}
