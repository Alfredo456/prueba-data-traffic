import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { PrincipalModule } from './modules/principal/principal.module';

@NgModule({
    declarations: [
        PagesComponent
    ],
    imports: [
        PagesRoutingModule,
        PrincipalModule,
    ],
    providers: [],
    bootstrap: []
})
export class PagesModule { }
