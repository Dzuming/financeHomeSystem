import { Component, OnInit, Input } from '@angular/core';
@Component({
  moduleId: 'module.id',
  selector: 'app-calculation',
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