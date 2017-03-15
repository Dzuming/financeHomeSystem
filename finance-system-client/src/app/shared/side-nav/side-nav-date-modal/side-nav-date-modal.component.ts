import { Component, OnInit, ElementRef  } from '@angular/core';
import { CalculateService } from '../../services/calculate.service';
import { ChartService } from '../../services/chart.service';
import { RestService } from '../../services/rest.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-side-nav-date-modal',
  templateUrl: './side-nav-date-modal.component.html',
  styleUrls: ['./side-nav-date-modal.component.scss']
})
export class SideNavDateModalComponent implements OnInit {
  public product: Product[];
  private errorMessage: string;
  private startDate: string;
  private endDate: string;
  private readonly months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private calculateService: CalculateService, private chartService: ChartService,
    private restService: RestService, private elementRef: ElementRef ) { }

  ngOnInit() {
    this.calculateService.subjectBudget.subscribe(
      data => {
        this.compareData(data[0].DateCreated, data[data.length - 1].DateCreated)
      }
    )
  }
  public getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.product = data;
      },
      error => this.errorMessage = <any>error,
      () => {
        this.restService.setProduct(this.product);
        this.chartService.updateChart(this.product);
      });
  }
  public compareData(startDate, endDate) {
    let startMonthAndYear = startDate.split('-', 2).map((data => {
      return parseInt(data);
    }));

    let endMonthAndYear = endDate.split('-', 2).map((data => {
      return parseInt(data);
    }));
    let i = endMonthAndYear[1];
    let modalBody = this.elementRef.nativeElement.querySelector('.modal-body');
    while (i >= startMonthAndYear[1]) {
      console.log(this.months[i-1])
      modalBody.insertAdjacentHTML('afterBegin', '<li>' + this.months[i-1] + '</li>');
      i--;
    }
  }
  public setDate(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let dataAttr = target.attributes.data;
    let value = dataAttr.nodeValue;
    this.calculateService.filterDate = value;
    this.getProducts(value);
    console.log(value)
  }
}
