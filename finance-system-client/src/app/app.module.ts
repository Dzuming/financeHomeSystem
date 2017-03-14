import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { CompareModule } from './compare/compare.module';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { LoaderService } from './shared/services/loader.service';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ProductModule,
    CompareModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
