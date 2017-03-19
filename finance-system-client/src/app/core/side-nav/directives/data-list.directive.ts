import { Directive, ElementRef, OnInit, HostListener, Renderer } from '@angular/core';
import { CalculateService } from '../../../shared/services/calculate.service';
import { Subject } from 'rxjs';
@Directive({
  selector: '[appDataList]'
})
export class DataListDirective implements OnInit {
  private startDate: string;
  private endDate: string;
  private readonly months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private calculateService: CalculateService, private elementRef: ElementRef, private renderer: Renderer) { }
  ngOnInit() {
    this.calculateService.subjectBudget.subscribe(
      data => {
        this.compareData(data[0].DateCreated, data[data.length - 1].DateCreated)
      }
    )
  }
  public compareData(startDate, endDate) {
    let startMonthAndYear = startDate.split('-', 2).map((data => {
      return parseInt(data);
    }));

    let endMonthAndYear = endDate.split('-', 2).map((data => {
      return parseInt(data);
    }));
    this.addDataToModal(startMonthAndYear, endMonthAndYear);
  }

  public addDataToModal(startDate, endDate) {
    let iterator = endDate[1];
    let modalBody = this.elementRef.nativeElement;
    modalBody.insertAdjacentHTML('afterBegin', '<ul>');
    let ul = modalBody.querySelector('ul');
    while (iterator >= startDate[1]) {
      ul.insertAdjacentHTML('afterBegin', '<li><span data="2017-0' + iterator + '"</span>' + this.months[iterator - 1] + '</li>');
      iterator--;
    }
    this.selectProductOnClick(ul)
  }

  selectProductOnClick(element) {
    let span = element.querySelectorAll('span');
    span.forEach(element => {
      this.renderer.listen(element, 'click', event => {
        this.calculateService.setData(event);
      })
    })

  }
}
