import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestService } from './services/rest.service';
import { CalculateService } from './services/calculate.service';
import { ChartService } from './services/chart.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guards';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SideNavComponent
  ],
  exports: [
    SideNavComponent
  ],
  providers: [
    CalculateService,
    RestService,
    ChartService,
    AuthenticationService,
    AuthGuard
  ],
})
export class SharedModule { }
