import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { ChartService } from '../../shared/services/chart.service';
import { Product } from '../../shared/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  products: Product[];
  type: string;
  private errorMessage: string;
  private getUrlPath: any;
  constructor(
    private restService: RestService,
    private activatedRoute: ActivatedRoute,
    private calculateService: CalculateService,
    private chartService: ChartService,
    private router: Router) { }

  ngOnInit() {
    this.restService.ProductBehavior.subscribe((data: Product[]): Product[] => this.products = data);
    this.getUrlPath = this.router.events.subscribe(() => {
      this.activatedRoute.params.subscribe(param => {
        this.getUrlPath.unsubscribe();
        this.type = param['param'];
        this.getProducts(this.restService.getIncomeStatement(this.calculateService.filterDate, this.type));
      })
    });

  }
  private getProducts(method: any): void {
    method
      .subscribe(
      (data: Product[]): void => {
        this.restService.setProduct(data);
      },
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.updateChart(this.products);
        this.restService.getBudget();
      });
  }
}
