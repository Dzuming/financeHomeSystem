//TODO: Update chart
//TODO: Update onChange - change detection
//TODO Function to getData
import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { RestService } from '../shared/services/rest.service';
import { ChartService } from '../shared/services/chart.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  private data: Array<any>;
  private errorMessage: Array<any>;
  public constructor(private restService: RestService, private chartService: ChartService) { }
  ngOnInit() {
    this.getData();

    // setInterval(() => {
    //   this.getData();
    // }, 5000)

  }

  ngOnChanges() {

  }
  private getData() {
    this.restService.getProducts().subscribe(
      data => this.data = data,
      error => this.errorMessage = <any>error,
      () => {
        this.chartService.createChart(this.data)
      })
  }
  




}