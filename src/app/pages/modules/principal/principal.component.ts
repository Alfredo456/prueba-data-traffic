import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { SELECTSETTINGS } from '../../shared/util/select.util';
import { LocalStorageService } from '../../shared/services/localstorage.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-pages-modules-principal',
    templateUrl: 'principal.component.html'
})
export class PrincipalComponent {
    public entitiesList: Array<any>;
    public setting: any;
    public selectedItem: any;

    constructor(public _modalService: ModalService, private _localStorageService: LocalStorageService, private _notificationsService: NotificationsService) {
        this.entitiesList = [
            { id: 1, itemName: 'Producto' },
            { id: 2, itemName: 'Proveedor' },
            { id: 3, itemName: 'Tienda' },
            { id: 4, itemName: 'Inventario' }
        ];
        this.setting = SELECTSETTINGS;
        this.selectedItem = null;
    }

    public select($event) {
        switch ($event.id) {
            case 1:
                if (!this._localStorageService.thereProvider()) {
                    this.selectedItem = [];
                    this._notificationsService.warn('no puede navegar a productos si no ha agregado proveedores');
                }
                break;
            case 4:
                if (!this._localStorageService.thereProduct() || !this._localStorageService.thereStore()) {
                    this.selectedItem = [];
                    this._notificationsService.warn('no puede navegar a inventario si no ha agregado tiendas y productos previamente');
                }
                break;

            default:
                break;
        }
    }
}
