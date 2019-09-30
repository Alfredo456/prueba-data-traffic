import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { ModalService } from 'src/app/pages/shared/services/modal.service';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';
import { StoreInventory } from 'src/app/pages/shared/models/store_inventory.model';

@Component({
    selector: 'app-component-principal-storeInventory-list',
    templateUrl: 'principal_list_storeInventory.html'
})
export class PrincipalListStoreInventoryComponent implements OnInit {
    public listInventory: Array<StoreInventory>;
    public totalRegister: number;
    public page: number;
    public dataperPage: number;
    public inventory_serial: string;
    @ViewChild('createStoreInventory', { static: false }) createStoreInventory: any;

    constructor(public _localStorageService: LocalStorageService, private _modalService: ModalService, private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
        this.page = 1;
        this.totalRegister = 0;
        this.dataperPage = 10;
    }

    ngOnInit(): void {
        this.getAllInventorys();
        this._reloadService.reload.subscribe(values => {
            this.getAllInventorys();
        });
    }

    public getAllInventorys() {
        this.listInventory = this._localStorageService.getAllIventory();
        this.totalRegister = this.listInventory ? this.listInventory.length : 0;
    }

    public editInventory(inventory_serial) {
        this.inventory_serial = inventory_serial;
        this.openActionModal();
    }
    public deleteInventory(inventory_serial) {
        if (this._localStorageService.deleteIventory(inventory_serial)) {
            this._notificationsService.success('Eliminación de Inventario', 'eliminación exitosa');
            this.getAllInventorys();
        } else {
            this._notificationsService.error('Eliminación de Inventario', 'error');
        }
    }
    public openActionModal() {
        this._modalService.openModal(this.createStoreInventory, { keyboard: false, backdrop: 'static' });
    }
}
