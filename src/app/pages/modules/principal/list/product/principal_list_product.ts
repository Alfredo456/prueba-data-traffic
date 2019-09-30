import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/pages/shared/models/product.model';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { ModalService } from 'src/app/pages/shared/services/modal.service';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';

@Component({
    selector: 'app-component-principal-product-list',
    templateUrl: 'principal_list_product.html'
})
export class PrincipalListProductComponent implements OnInit {
    public listProducts: Array<Product>;
    public totalRegister: number;
    public page: number;
    public dataperPage: number;
    public serial: string;
    @ViewChild('createProduct', { static: false }) createProduct: any;

    constructor(private _localStorageService: LocalStorageService, private _modalService: ModalService, private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
        this.page = 1;
        this.totalRegister = 0;
        this.dataperPage = 10;
    }

    ngOnInit(): void {
        this.getAllProducts();
        this._reloadService.reload.subscribe(values => {
            this.getAllProducts();
        });
    }

    public getAllProducts() {
        this.listProducts = this._localStorageService.getAllProducts();
        this.totalRegister = this.listProducts ? this.listProducts.length : 0;
    }

    public editProduct(serial) {
        this.serial = serial;
        this.openActionModal();
    }
    public deleteProduct(serial) {
        if (this._localStorageService.deleteProduct(serial)) {
            this._notificationsService.success('Eliminación de Producto', 'eliminación exitosa');
            this.getAllProducts();
        } else {
            this._notificationsService.error('Eliminación de Producto', 'error');
        }
    }
    public openActionModal() {
        this._modalService.openModal(this.createProduct, { keyboard: false, backdrop: 'static' });
    }
}
