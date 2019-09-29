import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { ListComponent } from './modules/list/list.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        PagesComponent,
        ListComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: []
})
export class PagesModule { }
