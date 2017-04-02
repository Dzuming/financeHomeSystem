import { Directive, ElementRef, OnInit, HostListener, Renderer } from '@angular/core';
import { RestService } from '../../../shared/services/rest.service';
import { CalculateService } from '../../../shared/services/calculate.service';
import { Subject } from 'rxjs/Subject';
import { Period } from '../../../shared/models/period.model';
@Directive({
  selector: '[appDataList]'
})
export class DataListDirective implements OnInit {
  private startDate: string;
  private endDate: string;
  private readonly months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(
    private calculateService: CalculateService,
    private restService: RestService,
    private elementRef: ElementRef,
    private renderer: Renderer) { }
  ngOnInit() {
    this.restService.getPeriod().subscribe(
      (data: Period): void => { this.createData(data.startDate, data.endDate); });
  }
  private createData(startDate: string, endDate: string): void {
    this.addDataToModal(this.getMonthAndYear(startDate), this.getMonthAndYear(endDate));
  }
  private getMonthAndYear(date: string): Array<number> {
    let data: Array<number> = [];
    data = date.split('-', 2).map(((data: string): number => {
      return parseInt(data, 10);
    }));
    return data
  }
  private addDataToModal(startDate: Array<number>, endDate: Array<number>): void {
    const modalBody = this.elementRef.nativeElement;
    const startMonth = startDate[1];
    const endMonth = endDate[1];
    const endYear = endDate[0];
    if (modalBody.querySelector('ul')) {
      return;
    }
    let iterator = endMonth;
    modalBody.insertAdjacentHTML('afterBegin', '<ul>');
    const ul = modalBody.querySelector('ul');
    while (iterator >= startMonth) {
      ul.insertAdjacentHTML('afterBegin', '<li><span data= "'
        + this.calculateService.transformDate(iterator, endYear)
        + '"</span>' + this.months[iterator - 1]
        + '</li>');
      iterator--;
    }
    this.selectProductOnClick(ul);
  }
  private selectProductOnClick(element: NodeSelector): void {
    let span: any = element.querySelectorAll('span');
    span.forEach(element => {
      this.renderer.listen(element, 'click', event => {
        return this.calculateService.setData(event);
      });
    });
  }
}
