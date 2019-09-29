import { NgModule } from '@angular/core';


import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { ListComponent } from './modules/list/list.component';

@NgModule({
    declarations: [
        PagesComponent,
        ListComponent,
    ],
    imports: [
        PagesRoutingModule,
    ],
    providers: [],
    bootstrap: []
})
export class PagesModule { }
