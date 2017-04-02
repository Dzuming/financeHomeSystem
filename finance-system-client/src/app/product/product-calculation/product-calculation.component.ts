import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
@Component({
  moduleId: 'module.id',
  selector: 'app-calculation',
  templateUrl: './product-calculation.component.html',
  styleUrls: ['product-calculation.component.scss'],
})
export class CalculationComponent implements OnInit {
  sumOfProfitAndSpending: string;
  currentBudget: string;
  startingBudget: number;
  private errorMessage: string;
  private allSpendings: Array<any> = [];
  constructor(
    private calculateService: CalculateService,
    private restService: RestService) { }

  ngOnInit() {
    this.getSpendings();
  }
  private getSpendings() {
    this.restService.ProductBehavior
      .subscribe(
      (data: Product[]) => {
        this.sumOfProfitAndSpending = this.calculateService.calculateProfitAndSpending(data);
        this.getBudget();
      },
      error => this.errorMessage = <any>error);
  }
  private getBudget() {
    this.restService.getBudget()
      .subscribe(
      data => this.currentBudget = data['Overall'],
      error => this.errorMessage = <any>error);
  }
}
