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
        this.tableSort();
        this.restService.ProductBehavior.subscribe(
      data => this.product = data,
      error => this.errorMessage = <any>error)
    }
    
    
    
    private tableSort() {
        const table = document.querySelector('.table-striped'),
            thead = table.querySelectorAll('thead'),
            tr = [].slice.call(thead[0].rows, 0),
            th = [].slice.call(tr[0].cells, 0);
        let isClicked;
        th.map(element => {
            element.addEventListener('click', () => {
                if (element.cellIndex >= th.length - 1) {
                    return 0;
                } else {
                    isClicked = isClicked === false ? true : false;
                    this.productService.sorting(table, element.cellIndex, isClicked);
                }
            }, true);
        });
    }
}
