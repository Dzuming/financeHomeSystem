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
        this.createData(data[0].DateCreated, data[data.length - 1].DateCreated)
      }
    )
  }
  private createData(startDate, endDate) {
    let startMonthAndYear = startDate.split('-', 2).map((data => {
      return parseInt(data);
    }));

    let endMonthAndYear = endDate.split('-', 2).map((data => {
      return parseInt(data);
    }));
    this.addDataToModal(startMonthAndYear, endMonthAndYear);
  }

  private addDataToModal(startDate, endDate) {
    let modalBody = this.elementRef.nativeElement;
    let startMonth = startDate[1];
    let endMonth = endDate[1];
    let endYear = endDate[0];
    if (modalBody.querySelector('ul')) {
      return;
    }
    let iterator = endMonth;
    modalBody.insertAdjacentHTML('afterBegin', '<ul>');
    let ul = modalBody.querySelector('ul');
    while (iterator >= startMonth) {
      ul.insertAdjacentHTML('afterBegin', '<li><span data= "' + this.calculateService.transformDate(iterator, endYear)  + '"</span>' + this.months[iterator - 1] + '</li>');
      iterator--;
    }
    this.selectProductOnClick(ul)
  }

  private selectProductOnClick(element) {
    let span = element.querySelectorAll('span');
    span.forEach(element => {
      this.renderer.listen(element, 'click', event => {
        this.calculateService.setData(event);
      })
    })

  }
}
