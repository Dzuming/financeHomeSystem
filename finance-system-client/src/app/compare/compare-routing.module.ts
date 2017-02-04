import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './compare.component';
import { AuthGuard } from '../shared/guards/auth.guards';
 export const compareRouting: ModuleWithProviders  = RouterModule.forChild (  [
    {
        path: 'compare',
        component: CompareComponent,
        canActivate: [AuthGuard]
    },
]);
@NgModule({
  imports: [compareRouting],
  exports: [RouterModule]
})
export class CompareRoutingModule { }
