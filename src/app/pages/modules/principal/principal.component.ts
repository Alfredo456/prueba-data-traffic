import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';

@Component({
    selector: 'app-pages-modules-principal',
    templateUrl: 'principal.component.html'
})
export class PrincipalComponent {
    constructor(public _modalService: ModalService) {
    }
}
