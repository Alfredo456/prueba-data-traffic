import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { ModalService } from 'src/app/pages/shared/services/modal.service';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';
import { Provider } from 'src/app/pages/shared/models/provider.model';

@Component({
    selector: 'app-component-principal-provider-list',
    templateUrl: 'principal_list_provider.html'
})
export class PrincipalListProviderComponent implements OnInit {
    public listProviders: Array<Provider>;
    public totalRegister: number;
    public page: number;
    public dataperPage: number;
    public nickname: string;
    @ViewChild('createProvider', { static: false }) createProvider: any;

    constructor(private _localStorageService: LocalStorageService, private _modalService: ModalService, private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
        this.page = 1;
        this.totalRegister = 0;
        this.dataperPage = 10;
    }

    ngOnInit(): void {
        this.getAllProviders();
        this._reloadService.reload.subscribe(values => {
            this.getAllProviders();
        });
    }

    public getAllProviders() {
        this.listProviders = this._localStorageService.getAllProvider();
        this.totalRegister = this.listProviders ? this.listProviders.length : 0;
    }

    public editProvider(nickname) {
        this.nickname = nickname;
        this.openActionModal();
    }
    public deleteProvider(nickname) {
        if (this._localStorageService.deleteProvider(nickname)) {
            this._notificationsService.success('Eliminación de Proveedor', 'eliminación exitosa');
            this.getAllProviders();
        } else {
            this._notificationsService.error('Eliminación de Proveedor', 'error');
        }
    }
    public openActionModal() {
        this._modalService.openModal(this.createProvider, { keyboard: false, backdrop: 'static' });
    }
}
