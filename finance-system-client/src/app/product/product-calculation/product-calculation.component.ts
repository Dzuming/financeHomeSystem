import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { Budget } from '../../shared/models/budget.model';
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
  currentBudget: number;
  startingBudget: number;
  private errorMessage: string;
  constructor(
    private calculateService: CalculateService,
    private restService: RestService) { }

  ngOnInit() {
    this.getSpendings();
  }
  private getSpendings(): void {
    this.restService.ProductBehavior
      .subscribe(
      (data: Product[]) => {
        this.sumOfProfitAndSpending = this.calculateService.calculateProfitAndSpending(data);
        this.getBudget();
      },
      error => this.errorMessage = <any>error);
  }
  private getBudget(): void {
    this.restService.getBudget()
      .subscribe(
      (data: Budget) => this.currentBudget = data.Overall,
      error => this.errorMessage = <any>error);
  }
}
