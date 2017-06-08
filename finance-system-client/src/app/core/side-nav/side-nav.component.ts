import { Component, Input, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { DomSanitizer, } from '@angular/platform-browser';
import { User } from '../../shared/models/user.model';
import { CalculateService } from '../../shared/services/calculate.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { BehaviorService } from "app/shared/services/behavior.service";
import { RestService } from '../../shared/services/rest.service';
import { Product } from 'app/shared/models/product.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  user: User;
  errorMessage: string;
  private type: string;
  private filterDate: string;
  constructor(
    public calculateService: CalculateService,
    public authenticationService: AuthenticationService,
    private restService: RestService,
     private behaviorService: BehaviorService,
    private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    this.getCurrenctUser();
    this.getUserAfterLogin();
    
    
    this.getType();
  }
  get getImg(): string {
    if (this.user) {
      return this.domSanitizer.sanitize(SecurityContext.URL, `data:image/png;base64,${this.user.Avatar.data}`);
    }
  }
  getUserAfterLogin() {
    this.behaviorService.userBehavior.subscribe(
      () => this.getCurrenctUser()
    )
  }
  getCurrenctUser() {
    this.user = JSON.parse(localStorage.getItem('User'));
  }
  getType() {
    this.behaviorService.typeBehavior.subscribe(
      (type: string) => {
       this.type = type;
      })
  }
  getProducts(filter: string): void {

     this.restService.getIncomeStatement(filter, this.type)
      .subscribe(
      (products: Product[]) => {
        this.behaviorService.setProduct(products);
      },
      (error: string) => this.errorMessage = <any>error);
  }


}
