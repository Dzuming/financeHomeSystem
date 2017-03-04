import { Component, OnInit } from '@angular/core';
import { CalculateService } from '../services/calculate.service';
import { ChartService } from '../services/chart.service';
import { RestService } from '../services/rest.service';
import { Product } from '../models/product.model';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent implements OnInit {
  public navigateUrl:Object = {
    'Url': '/compare',
    'name': 'Compare'
  }
  private errorMessage: string;
  private filterDate: string;
  private product: Product[];
  constructor(private chartService: ChartService, private restService: RestService, public calculateService: CalculateService, ) { }

  ngOnInit() {
  }
  public getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.product = data;
      },
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.updateChart(this.product);
        this.calculateService.calculateProfitAndSpending(this.product);
      });
  }
}
