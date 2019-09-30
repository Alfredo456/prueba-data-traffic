import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { SELECTSETTINGS } from '../../shared/util/select.util';

@Component({
    selector: 'app-pages-modules-principal',
    templateUrl: 'principal.component.html'
})
export class PrincipalComponent {
    public entitiesList: Array<any>;
    public setting: any;
    public selectedItem: any;

    constructor(public _modalService: ModalService) {
        this.entitiesList = [
            { id: 1, itemName: 'Producto' },
            { id: 2, itemName: 'Proveedor' },
            { id: 3, itemName: 'Tienda' },
            { id: 4, itemName: 'Inventario' }
        ];
        this.setting = SELECTSETTINGS;
        this.selectedItem = null;
    }
}
