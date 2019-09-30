import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';
import { ModalService } from './services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from './services/form.service';
import { PaginatePipe } from './pipes/paginate.pipe';

@NgModule({
    declarations: [
        PaginatePipe
    ],
    imports: [
        NgbModule
    ],
    providers: [
        LocalStorageService,
        ModalService,
        FormService
    ],
    exports: [
        PaginatePipe
    ],
    bootstrap: []
})
export class SharedModule { }
