import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./products/products.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
