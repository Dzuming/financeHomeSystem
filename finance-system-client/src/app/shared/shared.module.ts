import { NgModule } from '@angular/core';
import { RestService } from './services/rest.service';
import { CalculateService } from './services/calculate.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guards';
@NgModule({
  imports: [
  ],
  providers: [
    CalculateService,
    RestService,
    AuthenticationService,
    AuthGuard
  ],
})
export class SharedModule { }
