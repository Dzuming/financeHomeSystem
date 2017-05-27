import { NgModule } from '@angular/core';
import { RestService } from './services/rest.service';
import { CalculateService } from './services/calculate.service';
import { AuthenticationService } from './services/authentication.service';
import { BehaviorService } from './services/behavior.service'
import { AuthGuard } from './guards/auth.guards';
@NgModule({
  imports: [
  ],
  providers: [
    CalculateService,
    RestService,
    AuthenticationService,
    BehaviorService,
    AuthGuard
  ],
})
export class SharedModule { }
