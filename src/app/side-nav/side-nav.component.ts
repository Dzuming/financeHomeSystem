import { Component, OnInit } from '@angular/core';
import { CalculateService } from '../shared/services/calculate.service';
import { ProductComponent } from '../product/product.component';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: [CalculateService]
})
export class SideNavComponent implements OnInit {

  constructor(private productService: CalculateService, private productComponent: ProductComponent) { }

  ngOnInit() {
  }

}
