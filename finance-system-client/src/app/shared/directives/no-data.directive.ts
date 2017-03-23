import { Directive, ElementRef, OnChanges, Input } from '@angular/core';
import { RestService } from '../services/rest.service'
@Directive({
  selector: '[appNoData]'
})
export class NoDataDirective implements OnChanges {
  @Input() public product: any;
  constructor(private el: ElementRef, private restService: RestService) {

  }
  ngOnChanges(changes) {
    if (changes.product.currentValue && changes.product.currentValue.length === 0) {
      console.log('overall')
      this.errorBehavior(this.el, 'add');
    } else if (changes.product.previousValue && changes.product.previousValue.length === 0 && changes.product.currentValue.length !== 0){
      this.errorBehavior(this.el, 'remove');
    }
  }
  errorBehavior(element, behavior) {
     element.nativeElement.classList[behavior]('no-data');
  }
}
