import { Component, OnInit, Input } from '@angular/core';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { ProductService } from './shared/product.service';
import { ChartService } from '../shared/services/chart.service';
import { Product } from '../shared/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {
    private errorMessage: string;
    public product: Product[];
    public constructor(
        private calculateService: CalculateService,
        private restService: RestService,
        private productService: ProductService,
        private chartService: ChartService,
    ) { }

    public ngOnInit() {
        this.restService.ProductBehavior.subscribe(
            data => this.product = data,
            error => this.errorMessage = <any>error)
    }
}
