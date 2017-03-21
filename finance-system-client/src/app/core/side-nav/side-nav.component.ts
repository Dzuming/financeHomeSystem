import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalculateService } from '../../shared/services/calculate.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public navigateUrl: Object = {};
  public costUrl: Object = {};
  private filterDate: string;
  private getUrlPath: any;
  private compareOrProduct = [{
    'Url': '/compare',
    'name': 'Compare'
  }, {
    'Url': '/product/spending',
    'name': 'Product'
  }];
  private spendingOrProfit = [{
    'Url': '/product/profit',
    'name': 'Profit List'
  }, {
    'Url': '/product/spending',
    'name': 'Spending List'
  }];
  constructor(
    public calculateService: CalculateService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getUrlPath = this.router.events.subscribe(
      () => {
         this.navigateUrl = this.changeNavigateUrl(this.compareOrProduct, this.navigateUrl, this.router.url);
          this.costUrl = this.changeNavigateUrl(this.spendingOrProfit, this.costUrl, this.router.url);
      }
    );
  }
  public changeNavigateUrl(options, container, url?: string) {
    if (Object.keys(container).length === 0 && options[0].Url === url) {
      container = options[1];
    } else {
      container = container['Url'] === options[0].Url ? options[1] : options[0];
    }
    this.getUrlPath.unsubscribe();
    return container;
  }



}
