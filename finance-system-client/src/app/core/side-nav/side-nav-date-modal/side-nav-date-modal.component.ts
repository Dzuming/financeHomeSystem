import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CalculateService } from '../../../shared/services/calculate.service';
import { ChartService } from '../../../shared/services/chart.service';

import { Product } from '../../../shared/models/product.model';
import { ModalDirective } from 'ng2-bootstrap/modal';
@Component({
  selector: 'app-side-nav-date-modal',
  templateUrl: './side-nav-date-modal.component.html',
  styleUrls: ['./side-nav-date-modal.component.scss']
})
export class SideNavDateModalComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() selectedData: string;
  @Output() onClick = new EventEmitter();
  products: Product[];
  private errorMessage: string;
  constructor(
    private calculateService: CalculateService,
    private chartService: ChartService
    ) { }

  ngOnInit() {
    this.calculateService.selectedData.subscribe((data: any): void => this.setDateFromPeriod(data));
  }
  

  setDateFromPeriod(event: Event): void {
    const target = event.target || event.srcElement || event.currentTarget;
    const dataAttr = target['attributes'].data;
    const value = dataAttr.nodeValue;
    this.calculateService.filterDate = value;
    this.onClick.emit(value);
  }
  showModal(): void {
    this.childModal.show();
  }
  hideModal(): void {
    this.childModal.hide();
  }
}
