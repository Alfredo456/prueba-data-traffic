import { NgModule } from '@angular/core';


import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { ListComponent } from './modules/list/list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PagesComponent,
        ListComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
    ],
    providers: [],
    bootstrap: []
})
export class PagesModule { }
