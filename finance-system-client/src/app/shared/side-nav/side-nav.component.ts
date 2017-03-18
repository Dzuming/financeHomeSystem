import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CalculateService } from '../services/calculate.service';
import { SideNavDateModalComponent } from './side-nav-date-modal/side-nav-date-modal.component';
import { ModalDirective, ModalModule } from 'ng2-bootstrap';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild('childModal') childModal: SideNavDateModalComponent;
  public navigateUrl: Object = {};
  private filterDate: string;
  private getUrlPath: any;

  constructor(
    public calculateService: CalculateService,
    private router: Router,
    private viewContainerRef: ViewContainerRef
  ) { }
  ngOnInit() {
    this.getUrlPath = this.router.events.subscribe(
      () => this.changeNavigateUrl(this.router.url)
    );
  }
  public changeNavigateUrl(url?: string) {
    const options = [{
      'Url': '/compare',
      'name': 'Compare'
    }, {
      'Url': '/product',
      'name': 'Product'

    }];
    if (Object.keys(this.navigateUrl).length === 0 && options[0].Url === url) {
      this.navigateUrl = options[1];
    } else {
      this.navigateUrl = this.navigateUrl['Url'] === options[0].Url ? options[1] : options[0];
    }
    this.getUrlPath.unsubscribe();
    return this.navigateUrl;
  }



}
