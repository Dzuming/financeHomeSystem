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
  private currentBudget: string;
  public startingBudget: number;
  private allSpendings: Array<any> = [];
  private sumOfProfitAndSpending: string;
  constructor(private restService: RestService, public calculateService: CalculateService) { }

  ngOnInit() {
    this.getBudget()
    this.getAllProducts()
    this.calculateService.subjectBudget.subscribe(
      data => this.currentBudget  = this.calculateService.calculateBudget(data, this.calculateService.startingBudget)
    )
    
    this.getSpendings();
  }
  private getSpendings() {
    this.restService.ProductBehavior
      .subscribe(
      (data: Product[]) => {
        this.sumOfProfitAndSpending = this.calculateService.calculateProfitAndSpending(data);
      },
      error => this.errorMessage = <any>error);
  }
  private getBudget() {
    this.restService.getBudget()
      .subscribe(
      data => this.calculateService.startingBudget = data[0].Overall,
      error => this.errorMessage = <any>error);
  }
  getAllProducts() {
    this.restService.getSpendings()
      .subscribe(
      data => {
        this.allSpendings = data;
      },
      error => this.errorMessage = <any>error,
      () => this.calculateService.setBudget(this.allSpendings)
        
      );
  }
}
