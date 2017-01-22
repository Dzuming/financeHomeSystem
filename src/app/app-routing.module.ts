import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
