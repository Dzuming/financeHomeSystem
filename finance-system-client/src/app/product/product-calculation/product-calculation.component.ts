import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { Budget } from '../../shared/models/budget.model';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  type: string;
  private getUrlPath: any;
  private errorMessage: string;
  constructor(
    private calculateService: CalculateService,
    private restService: RestService,
    private router: Router,
        private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getIncomeStatement();
    this.getUrlPath = this.router.events.subscribe(() => {
            this.activatedRoute.params.subscribe(param => {
                this.getUrlPath.unsubscribe();
                this.type = param['param'];
            });
        });
  }
  private getIncomeStatement(): void {
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
