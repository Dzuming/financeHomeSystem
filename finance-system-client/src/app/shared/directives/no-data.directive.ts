import { Directive, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Product } from '../models/product.model';
@Directive({
  selector: '[appNoData]'
})
export class NoDataDirective implements OnChanges {
  @Input() products: Product[];
  constructor(
    private el: ElementRef,
    private restService: RestService) {

  }
  ngOnChanges(changes: any): void {
    if (changes.products.currentValue && changes.products.currentValue.length === 0) {
      this.errorBehavior(this.el, 'add');
    } else if (changes.products.previousValue && changes.products.previousValue.length === 0 && changes.products.currentValue.length !== 0) {
      this.errorBehavior(this.el, 'remove');
    }
  }
  errorBehavior(element: ElementRef, behavior: string) {
    element.nativeElement.classList[behavior]('no-data');
  }
}
