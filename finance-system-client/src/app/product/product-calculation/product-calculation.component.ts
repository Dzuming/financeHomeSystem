import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
@Component({
  moduleId: 'module.id',
  selector: 'app-calculation',
  templateUrl: './product-calculation.component.html',
  styleUrls:['product-calculation.component.scss']
})
export class CalculationComponent implements OnInit {
  private errorMessage: string;
  private currentBudget: string;
  private allProducts: Array<any> = [];
  constructor(private restService: RestService, public calculateService: CalculateService) { }

  ngOnInit() {
    this.getProducts(this.calculateService.filterDate);
  }
  private getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.calculateService.calculateProfitAndSpending(data);
        this.getBudget();
      },
      error => this.errorMessage = <any>error,
      () => {
        this.getAllProducts();
      });
  }
  private getBudget() {
    this.restService.getBudget()
      .subscribe(
      data => this.calculateService.startingBudget = data[0].Overall,
      error => this.errorMessage = <any>error);
  }
  getAllProducts() {
    this.restService.getProducts()
      .subscribe(
      data => {
        this.allProducts = data;
      },
      error => this.errorMessage = <any>error,
      () => {
        this.calculateService.calculateBudget(this.allProducts, this.calculateService.startingBudget);
      });
  }
}
