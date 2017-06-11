import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule { }
