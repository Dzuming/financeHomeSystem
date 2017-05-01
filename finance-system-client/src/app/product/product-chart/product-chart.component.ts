import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { RestService } from '../../shared/services/rest.service';
import { ChartService } from '../../shared/services/chart.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { Product } from '../../shared/models/product.model';
@Component({
  moduleId: 'module.id',
  selector: 'app-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['product-chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() products: Product[];
  private errorMessage: Array<any>;
  constructor(
    private restService: RestService,
    private chartService: ChartService,
    private calculateService: CalculateService) { }
  ngOnChanges(changes: any): void {
    // if (changes.products.currentValue && changes.products.currentValue.length !== 0) {
    // this.chartService.createChart(changes.products);
    // }
  }
}
