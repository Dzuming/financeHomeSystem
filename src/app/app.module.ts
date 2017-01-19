import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { RestService } from './shared/services/rest.service';
import { CalculateService } from './shared/services/calculate.service';
import { ChartService } from './shared/services/chart.service';
import { ProductService } from './product/product.service';
import { ProductPipe } from './product/product.pipe';
import { ChartComponent } from './chart/chart.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CalculationComponent } from './calculation/calculation.component';
import { AppRoutingModule } from './app.routing';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductPipe,
    ChartComponent,
    SideNavComponent,
    CalculationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    CalculateService,
    RestService,
    ChartService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
