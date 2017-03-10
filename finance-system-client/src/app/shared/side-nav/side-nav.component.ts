import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalculateService } from '../services/calculate.service';
import { ChartService } from '../services/chart.service';
import { RestService } from '../services/rest.service';
import { Product } from '../models/product.model';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public navigateUrl: Object = {};
  private errorMessage: string;
  private filterDate: string;
  private getUrlPath: any;
  constructor(
    private chartService: ChartService,
    private restService: RestService,
    public calculateService: CalculateService,
    private router: Router) { }
  ngOnInit() {
    this.getUrlPath = this.router.events.subscribe(
      () => this.changeNavigateUrl(this.router.url)
    );
  }
  public getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.restService.product = data;
      },
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.updateChart(this.restService.product);
        this.calculateService.calculateProfitAndSpending(this.restService.product);
      });
  }
  public changeNavigateUrl(url?: string) {
    const options = [{
      'Url': '/compare',
      'name': 'Compare'
    }, {
      'Url': '/product',
      'name': 'Product'

    }];
    if (Object.keys(this.navigateUrl).length === 0 && options[0].Url === url) {
      this.navigateUrl = options[1];
    } else {
      this.navigateUrl = this.navigateUrl['Url'] === options[0].Url ? options[1] : options[0];
    }
    this.getUrlPath.unsubscribe();
    return this.navigateUrl;
  }
}
