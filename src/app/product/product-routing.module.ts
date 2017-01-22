import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
 export const productRouting: ModuleWithProviders  = RouterModule.forChild (  [
    {
        path: 'product',
        component: ProductComponent
    },
]);
@NgModule({
  imports: [productRouting],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
