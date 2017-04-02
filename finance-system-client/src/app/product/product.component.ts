import { Component, OnInit, Input } from '@angular/core';
import { CalculateService } from '../shared/services/calculate.service';
import { RestService } from '../shared/services/rest.service';
import { ChartService } from '../shared/services/chart.service';
import { Product } from '../shared/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {
    products: Product[];
    private errorMessage: string;
    constructor(
        private calculateService: CalculateService,
        private restService: RestService,
        private chartService: ChartService,
    ) { }

    ngOnInit() {
        this.restService.ProductBehavior.subscribe(
            (data: Product[]): Product[] => this.products = data,
            error => this.errorMessage = <any>error)
    }
}
