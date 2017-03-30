import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProductService } from './shared/product.service';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product.component';
import { CalculationComponent } from './product-calculation/product-calculation.component';
import { ChartComponent } from './product-chart/product-chart.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';
import { NoDataDirective } from '../shared/directives/no-data.directive';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { TableSortDirective } from './shared/table-sort.directive';
import {ProductPipe} from './shared/product.pipe'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent,
    ChartComponent,
    CalculationComponent,
    ProductTableComponent,
    NoDataDirective,
    TableSortDirective,
    ProductFormComponent,
    ProductPipe
  ],
  exports: [
    ProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
