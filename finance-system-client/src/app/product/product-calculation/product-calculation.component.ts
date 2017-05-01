import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-calculation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-calculation.component.html',
  styleUrls: ['product-calculation.component.scss'],
})
export class CalculationComponent implements OnInit {
  @Input() sumIncomeStatement: string;
  @Input() currentBudget: number;
  @Input() type: string;
  constructor() { }

  ngOnInit() {}
}