import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { ChartService } from '../../shared/services/chart.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  @Input() products: Product[];
  @Input() type: string;
  private errorMessage: string;
  constructor(
    private restService: RestService,
    
    private calculateService: CalculateService,
    private chartService: ChartService,
    ) { }

  ngOnInit() {
  }
  
}
