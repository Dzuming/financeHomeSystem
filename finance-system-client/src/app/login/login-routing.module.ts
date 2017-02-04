import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
 export const loginRouting: ModuleWithProviders  = RouterModule.forChild (  [
    {
        path: 'login',
        component: LoginComponent
    },
]);
@NgModule({
  imports: [loginRouting],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
