import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareComponent } from './compare.component';
import { RouterModule, Routes } from '@angular/router';
import { CompareRoutingModule } from './compare-routing.module';
@NgModule({
    imports: [
        CommonModule,
        CompareRoutingModule
    ],
    declarations: [
        CompareComponent
    ],
    exports: [
        CompareComponent
    ],
    providers: [
    ]
})
export class CompareModule { }
