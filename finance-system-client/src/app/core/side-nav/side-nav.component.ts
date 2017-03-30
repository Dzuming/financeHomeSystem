import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalculateService } from '../../shared/services/calculate.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  private filterDate: string;
  // public currentUser = localStorage.getItem('id_token')
  constructor(
    public calculateService: CalculateService
  ) { }
  ngOnInit() {
  }



}
