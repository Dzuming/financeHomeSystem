import { Component, Input, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { DomSanitizer, } from '@angular/platform-browser';
import { User } from '../../shared/models/user.model';
import { CalculateService } from '../../shared/services/calculate.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RestService } from '../../shared/services/rest.service';
import { Product } from 'app/shared/models/product.model';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  user: User;
  products: Product[];
  errorMessage: string;
  private filterDate: string;
  constructor(
    public calculateService: CalculateService,
    public authenticationService: AuthenticationService,
    private restService: RestService,
    private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User'));
  }
  get getImg(): string {
    if (this.user) {
      return this.domSanitizer.sanitize(SecurityContext.URL, `data:image/png;base64,${this.user.Avatar.data}`);
    }
  }
  getProducts(filter: string): void {
    this.restService.getIncomeStatement(filter, 'Spending')
      .subscribe(
      (products: Product[]) => {
        this.restService.setProduct(products);
      },
      (error: string) => this.errorMessage = <any>error,
      () => {

        // this.chartService.updateChart(this.products);
      });
  }


}
