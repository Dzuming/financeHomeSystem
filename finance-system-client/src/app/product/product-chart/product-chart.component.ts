import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
export class ChartComponent implements OnInit {
  private product: Array<Product>;
  private errorMessage: Array<any>;
  public constructor(private restService: RestService, private chartService: ChartService, private calculateService: CalculateService) { }
  ngOnInit() {
    this.restService.ProductBehavior.subscribe(
      data => this.product = data,
      error => this.errorMessage = <any>error);
  }
}
