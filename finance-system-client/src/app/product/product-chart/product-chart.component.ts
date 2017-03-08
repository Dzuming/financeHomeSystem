import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { RestService } from '../../shared/services/rest.service';
import { ChartService } from '../../shared/services/chart.service';
import { CalculateService } from '../../shared/services/calculate.service';
@Component({
  moduleId: 'module.id',
  selector: 'app-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['product-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {
  private data: Array<any>;
  private errorMessage: Array<any>;
  public constructor(private restService: RestService, private chartService: ChartService, private calculateService: CalculateService) { }
  ngOnInit() {
    this.getData(this.calculateService.filterDate);
  }
  private getData(filter) {
    this.restService.getProducts(filter).subscribe(
      data => this.data = data,
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.createChart(this.data);
      });
  }
}
