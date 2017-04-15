import { NgModule, ModuleWithProviders } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule
  ],
  declarations: [
    RegistrationComponent
  ],
  exports: [
    RegistrationComponent
  ],
})
export class RegistrationModule { }
