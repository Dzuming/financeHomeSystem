import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { CalculateService } from '../../shared/services/calculate.service';
import { ChartService } from '../../shared/services/chart.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-table',
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
    this.restService.ProductBehavior.subscribe((data: Product[]): Product[] => this.products = data);
    

  }
  
}
