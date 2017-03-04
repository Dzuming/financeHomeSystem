import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductPipe } from './product/product.pipe';
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { CompareModule } from './compare/compare.module';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ProductPipe,
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
