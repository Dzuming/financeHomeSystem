import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
 export const registrationRouting: ModuleWithProviders  = RouterModule.forChild (  [
    {
        path: 'registration',
        component: RegistrationComponent
    },
]);
@NgModule({
  imports: [registrationRouting],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
