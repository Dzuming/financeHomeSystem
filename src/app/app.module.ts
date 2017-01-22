import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestService } from './shared/services/rest.service';
import { CalculateService } from './shared/services/calculate.service';
import { ChartService } from './shared/services/chart.service';
import { ProductPipe } from './product/product.pipe';
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { CompareModule } from './compare/compare.module';
@NgModule({
  declarations: [
    AppComponent,
    ProductPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ProductModule,
    CompareModule
  ],
  providers: [
    CalculateService,
    RestService,
    ChartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
