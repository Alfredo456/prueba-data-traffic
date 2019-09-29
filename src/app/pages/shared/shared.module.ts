import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';
import { ModalService } from './services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
    ],
    imports: [
        NgbModule
    ],
    providers: [
        LocalStorageService,
        ModalService
    ],
    bootstrap: []
})
export class SharedModule { }
