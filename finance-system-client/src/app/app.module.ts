import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { DataListDirective } from './core/side-nav/directives/data-list.directive';
import { SideNavDateModalComponent } from './core/side-nav/side-nav-date-modal/side-nav-date-modal.component';
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { CompareModule } from './compare/compare.module';
import { CoreModule } from './core/core.module';
import { LoaderService } from './shared/services/loader.service';
import { ModalModule } from 'ng2-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    SideNavDateModalComponent,
    DataListDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ProductModule,
    CompareModule,
    CoreModule,
    ModalModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
