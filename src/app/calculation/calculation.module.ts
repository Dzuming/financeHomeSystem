import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationComponent } from './calculation.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CalculationComponent
  ],
  exports: [
    CalculationComponent
  ]
})
export class CalculationModule { }
