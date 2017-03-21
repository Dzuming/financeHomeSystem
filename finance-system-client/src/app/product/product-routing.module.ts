import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AuthGuard } from '../shared/guards/auth.guards';
export const productRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'product/:param', component: ProductComponent, canActivate: [AuthGuard]
    },
]);
@NgModule({
    imports: [productRouting],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
