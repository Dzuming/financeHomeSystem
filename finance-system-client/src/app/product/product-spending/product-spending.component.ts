import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Product } from '../../shared/models/product.model';
import { CalculateService } from '../../shared/services/calculate.service';

@Component({
  selector: 'app-product-spending',
  templateUrl: './product-spending.component.html',
  styleUrls: ['./product-spending.component.scss']
})
export class ProductSpendingComponent implements OnInit {
  public product: Product[];
  private errorMessage: string;
  constructor(private restService: RestService, private calculateService: CalculateService) { }

  ngOnInit() {
    this.getProducts(this.calculateService.filterDate);
  }
  private getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.product = data;
        this.restService.setProduct(data)
      },
      error => this.errorMessage = <any>error,
      () => {
        this.calculateService.calculateBudget(this.product, this.calculateService.startingBudget);
        // this.chartService.updateChart(this.product);
        this.restService.getBudget();
      });
  }
}
