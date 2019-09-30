import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';
import { ModalService } from './services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from './services/form.service';

@NgModule({
    declarations: [
    ],
    imports: [
        NgbModule
    ],
    providers: [
        LocalStorageService,
        ModalService,
        FormService
    ],
    bootstrap: []
})
export class SharedModule { }
