import { Component, OnInit, Input } from '@angular/core';
import { CalculateService } from '../../services/calculate.service';
import { ChartService } from '../../services/chart.service';
import { RestService } from '../../services/rest.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-side-nav-date-modal',
  templateUrl: './side-nav-date-modal.component.html',
  styleUrls: ['./side-nav-date-modal.component.scss']
})
export class SideNavDateModalComponent implements OnInit {
  @Input() selectedData: string;
  public product: Product[];
  private errorMessage: string;
  constructor(private calculateService: CalculateService, private chartService: ChartService,
    private restService: RestService) { }

  ngOnInit() {
    this.calculateService.selectedData.subscribe(data => this.setDate(data))
    
  }
  public getProducts(filter) {
    this.restService.getProducts(filter)
      .subscribe(
      (data: Product[]) => {
        this.product = data;
      },
      error => this.errorMessage = <any>error,
      () => {
        this.restService.setProduct(this.product);
        this.chartService.updateChart(this.product);
      });
  }

  public setDate(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let dataAttr = target.attributes.data;
    let value = dataAttr.nodeValue;
    this.calculateService.filterDate = value;
    this.getProducts(value);
    console.log(value)
  }
}
