import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './compare.component';
 export const compareRouting: ModuleWithProviders  = RouterModule.forChild (  [
    {
        path: 'compare',
        component: CompareComponent
    },
]);
@NgModule({
  imports: [compareRouting],
  exports: [RouterModule]
})
export class CompareRoutingModule { }
