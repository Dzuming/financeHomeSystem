import { Component, OnInit } from '@angular/core';
import { CalculateService } from '../shared/services/calculate.service';
import { ChartService } from '../shared/services/chart.service';
import { RestService } from '../shared/services/rest.service';
import { Product } from '../shared/models/product.model';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  private errorMessage:string;
  private filterDate:string
  constructor(private calculateService: CalculateService, private chartService: ChartService, private restService: RestService) { }

  ngOnInit() {
    this.calculateService.filterDate
  }
  private getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.restService.product = data
      },
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.updateChart(this.restService.product)
        this.calculateService.calculateProfitAndSpending(this.restService.product);
        // this.restService.getBudget();
      });
  }
}
