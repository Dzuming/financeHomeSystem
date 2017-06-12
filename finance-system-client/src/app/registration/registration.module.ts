import { NgModule, ModuleWithProviders } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule
  ],
  declarations: [
    RegistrationComponent,
    RegistrationFormComponent
  ],
  exports: [
    RegistrationComponent
  ],
})
export class RegistrationModule { }
