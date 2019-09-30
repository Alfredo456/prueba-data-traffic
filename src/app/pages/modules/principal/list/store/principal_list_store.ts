import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { ModalService } from 'src/app/pages/shared/services/modal.service';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';
import { Store } from 'src/app/pages/shared/models/store.model';

@Component({
    selector: 'app-component-principal-store-list',
    templateUrl: 'principal_list_store.html'
})
export class PrincipalListStoreComponent implements OnInit {
    public listStores: Array<Store>;
    public totalRegister: number;
    public page: number;
    public dataperPage: number;
    public code: string;
    @ViewChild('createStore', { static: false }) createStore: any;

    constructor(private _localStorageService: LocalStorageService, private _modalService: ModalService, private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
        this.page = 1;
        this.totalRegister = 0;
        this.dataperPage = 10;
    }

    ngOnInit(): void {
        this.getAllStores();
        this._reloadService.reload.subscribe(values => {
            this.getAllStores();
        });
    }

    public getAllStores() {
        this.listStores = this._localStorageService.getAllStore();
        this.totalRegister = this.listStores ? this.listStores.length : 0;
    }

    public editStore(code) {
        this.code = code;
        this.openActionModal();
    }
    public deleteStore(code) {
        if (this._localStorageService.deleteStore(code)) {
            this._notificationsService.success('Eliminación de Tienda', 'eliminación exitosa');
            this.getAllStores();
        } else {
            this._notificationsService.error('Existen inventarios relacionados a esta tienda eliminelos antes');
        }
    }
    public openActionModal() {
        this._modalService.openModal(this.createStore, { keyboard: false, backdrop: 'static' });
    }
}
