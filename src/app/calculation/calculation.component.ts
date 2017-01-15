import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { RestService } from '../shared/services/rest.service';
import { CalculateService } from '../shared/services/calculate.service';
@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {
  private startingBudget: number = 0;
  private errorMessage: string;
  private currentBudget: string;
  private allProducts: Array<any> = [];
  constructor(private restService: RestService, private calculateService: CalculateService) { }

  ngOnInit() {
    this.getProducts(this.calculateService.filterDate);
    this.calculateBudget();
  }
  public ngDoCheck() {
    this.currentBudget = this.calculateService.calculateValues(this.allProducts, this.startingBudget);
    }
  private getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.calculateService.calculateProfitAndSpending(data);
      },
      error => this.errorMessage = <any>error,
      () => {
        this.getBudget();
        
      });
  }
  private getBudget() {
    this.restService.getBudget()
      .subscribe(
      data => this.startingBudget = data[0].overall,
      error => this.errorMessage = <any>error)
  }
  calculateBudget() {
        this.restService.getProducts()
            .subscribe(
            data => {
                this.allProducts = data
            },
            error => this.errorMessage = <any>error,
            () => {
                this.getBudget()
            });
    }
}
