import { Component, Input, OnChanges, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { Product } from '../../shared/models/product.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
@Component({
  moduleId: 'module.id',
  selector: 'app-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-chart.component.html',
  styleUrls: ['product-chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  single: any;
  @Input() products: Product[];
  private errorMessage: Array<any>;
  private type: string;
  colorScheme = {
    domain: ['#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
      '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3']
  };
  constructor(
    private restService: RestService,
    private calculateService: CalculateService) {
      Object.assign(this, { single })
  }
  ngOnInit() {
    this.getType()
  }
   rawDataChart(setData, type) {
    return setData.filter((data) => data[type] > 0)
      .map((dataset) => { return  { 'name': dataset.Category.name, value: dataset[type] }; });
  }
  ngOnChanges(changes: any): void {
    if (changes.products.currentValue && changes.products.currentValue.length !== 0) {
      this.single = this.rawDataChart(this.products, this.type)
    }
  }
  getType() {
    this.restService.TypeBehavior.subscribe(
      (type: string) => {
        this.type = type;
      })
  }
}
