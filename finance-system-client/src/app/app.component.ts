import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  urlPath: string;
  constructor(
    private router: Router) { }
  ngOnInit() {
    this.getUrlPath();
  }
  getUrlPath() {
    this.router.events.subscribe(() => {
      this.urlPath = this.router.url;
    });
  }

}
