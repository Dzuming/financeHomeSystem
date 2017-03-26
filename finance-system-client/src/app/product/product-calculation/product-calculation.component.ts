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
  private errorMessage: string;
  public currentBudget: string;
  public startingBudget: number;
  private allSpendings: Array<any> = [];
  public sumOfProfitAndSpending: string;
  constructor(private restService: RestService, public calculateService: CalculateService) { }

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
      data => this.currentBudget = data[data.length - 1].Overall,
      error => this.errorMessage = <any>error);
  }
}
