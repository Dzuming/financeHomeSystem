import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';
import { SideNavModule } from '../side-nav/side-nav.module';
import { CalculationModule } from '../calculation/calculation.module';
import { ChartModule } from '../chart/chart.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SideNavModule,
    CalculationModule,
    ChartModule
  ],
  declarations: [
    ProductComponent
  ],
  exports:[
      ProductComponent
  ],
  providers: [
      ProductService
  ]
})
export class ProductModule { }
