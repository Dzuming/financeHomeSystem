import { NgModule } from '@angular/core';

import { CalculateService } from '../shared/services/calculate.service';
import { ChartService } from '../shared/services/chart.service';
import { RestService } from '../shared/services/rest.service';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
    ],
    providers: [
        CalculateService,
        RestService,
        ChartService
    ],
})
export class CoreModule { }
