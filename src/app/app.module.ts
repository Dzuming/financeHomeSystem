import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestService } from './shared/services/rest.service';
import { CalculateService } from './shared/services/calculate.service';
import { ChartService } from './shared/services/chart.service';
import { ProductPipe } from './product/product.pipe';
import { ProductModule } from './product/product.module';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { CompareComponent } from './compare/compare.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductPipe,
    LoginComponent,
    CompareComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    ProductModule,
    
    
  ],
  providers: [
    CalculateService,
    RestService,
    ChartService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
