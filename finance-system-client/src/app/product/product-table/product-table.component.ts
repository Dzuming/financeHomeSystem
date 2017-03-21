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
  public product: Product[];
  public title: string; 
  private errorMessage: string;
  private getUrlPath: any;
  constructor(private restService: RestService, private activatedRouter: ActivatedRoute, private calculateService: CalculateService, private chartService: ChartService, private router: Router) { }

  ngOnInit() {
    this.restService.ProductBehavior.subscribe(data => this.product = data)
    this.getUrlPath = this.router.events.subscribe(() => {
      this.activatedRouter.params.subscribe(param => {
        this.getUrlPath.unsubscribe();
        this.title = param['param'];
        if (param['param'] === 'Spending') {
          this.getProducts(this.restService.getProducts(this.calculateService.filterDate));
          
        } else {
          console.log('ddd')
        }
      });
    })

  }
  private getProducts(method) {
    method
      .subscribe(
      (data: Product[]) => {
        this.restService.setProduct(data)
      },
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.updateChart(this.product);
        this.restService.getBudget();
      });
  }
}
