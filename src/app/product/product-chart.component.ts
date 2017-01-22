import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { RestService } from '../shared/services/rest.service';
import { ChartService } from '../shared/services/chart.service';
@Component({
  moduleId: 'module.id',
  selector: 'app-chart',
  templateUrl: './product-chart.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  private data: Array<any>;
  private errorMessage: Array<any>;
  public constructor(private restService: RestService, private chartService: ChartService) { }
  ngOnInit() {
    this.getData();
  }
  private getData() {
    this.restService.getProducts().subscribe(
      data => this.data = data,
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.createChart(this.data);
      });
  }
}
