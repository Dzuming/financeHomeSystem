import { Component, Input, OnInit, ViewChild, SecurityContext } from '@angular/core';
import {DomSanitizer, } from '@angular/platform-browser';
import { CalculateService } from '../../shared/services/calculate.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  private filterDate: string;
  private user = JSON.parse(localStorage.getItem('User'));
  constructor(
    public calculateService: CalculateService,
    public authenticationService: AuthenticationService,
    public domSanitizer: DomSanitizer
  ) { }
  ngOnInit() {
  }
get getImg() {
    
    return this.domSanitizer.sanitize(SecurityContext.URL, `data:image/png;base64,${this.user.Avatar.data}`);
}


}
