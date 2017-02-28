import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromevent';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit  {
  public urlPath:string;
  constructor (private router: Router) {}
  ngOnInit () {
    this.getUrlPath()
  }
   getUrlPath () {
    this.router.events.subscribe((val) => {
        this.urlPath = this.router.url
    });
   } 
  
 }