import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';
import { ModalService } from './services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from './services/form.service';
import { PaginatePipe } from './pipes/paginate.pipe';
import { OnlyNumber } from './directives/only-number.directive';

@NgModule({
    declarations: [
        PaginatePipe,
        OnlyNumber
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
        PaginatePipe,
        OnlyNumber
    ],
    bootstrap: []
})
export class SharedModule { }
