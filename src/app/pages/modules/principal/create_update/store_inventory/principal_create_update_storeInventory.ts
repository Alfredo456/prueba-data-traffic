import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/pages/shared/services/form.service';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';
import { StoreInventory } from 'src/app/pages/shared/models/store_inventory.model';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { SELECTSETTINGS } from 'src/app/pages/shared/util/select.util';

@Component({
    selector: 'app-component-principal-store-inventory-create-update',
    templateUrl: 'principal_create_update_storeInventory.html'
})
export class PrincipalCreateUpdateStoreInventoryComponent implements OnInit {

    public productForm: FormGroup;
    public fromDate: NgbDateStruct;
    public setting: any;
    public selectedProduct: any;
    public selectedStore: any;
    public productList: any;
    public storeList: any;

    @Input('close') close: any;
    @Input('dismiss') dismiss: any;
    @Input('inventory_serial') inventory_serial?: any;

    constructor(private fb: FormBuilder,
        public _formService: FormService,
        calendar: NgbCalendar,
        config: NgbDatepickerConfig,
        private _localStorageService: LocalStorageService,
        private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
        config.minDate = { year: 1910, month: 1, day: 1 };
        config.maxDate = calendar.getToday();
        this.setting = SELECTSETTINGS;
        this.selectedProduct = null;
        this.selectedStore = null;
    }

    ngOnInit(): void {
        this.initializeList();
        if (this.inventory_serial) {
            this.initEditForm();
        } else {
            this.initForm();
        }
    }

    public initForm() {
        this.productForm = this.fb.group({
            product_serial: [null, [Validators.required]],
            inventory_serial: [null, [Validators.required]],
            store_code: [null, [Validators.required]],
            quantity: [null, [Validators.required]],
            purchaseDate: [null, [Validators.required]],
        });
    }

    public initEditForm() {
        const product = this._localStorageService.getInventoryById(this.inventory_serial);
        const date: Date = new Date(product.purchaseDate);
        this.fromDate = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
        this.productForm = this.fb.group({
            product_serial: [this.chargeProduct_serial(product.product_serial), [Validators.required]],
            inventory_serial: [product.inventory_serial, [Validators.required]],
            store_code: [this.chargeStore_code(product.store_code), [Validators.required]],
            quantity: [product.quantity, [Validators.required]],
            purchaseDate: [product.purchaseDate, [Validators.required]],
        });
        //this.productForm.controls['serial'].disable();
        this.selectedProduct = this.productForm.value.product_serial;
        this.selectedStore = this.productForm.value.store_code;
    }

    public initializeList() {
        this.productList = this._localStorageService.getAllProducts().map((item) => {
            return {
                id: item.serial,
                itemName: item.name,
                quantity: item.quantity
            };
        });
        this.storeList = this._localStorageService.getAllStore().map((item) => {
            return {
                id: item.code,
                itemName: item.name
            };
        });
    }
    public chargeProduct_serial(product_serial) {
        return [this.productList.find(x => x.id === product_serial)];
    }
    public chargeStore_code(store_code) {
        return [this.storeList.find(x => x.id === store_code)];
    }

    public save() {
        this._formService.markAllAsTouched(this.productForm);
        if (this.productForm.valid) {
            if (this.inventory_serial) {
                if (this._localStorageService.updateIventory(this.formatForm())) {
                    this._notificationsService.success('Edición de Inventario', 'edición exitosa');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Edición de Inventario', 'error');
                }
            } else {
                if (this.validateStock()) {
                    if (this._localStorageService.setInventory(this.formatForm())) {
                        this._notificationsService.success('Registro de Inventario', 'registro exitoso');
                        this._reloadService.reloadAction();
                        this.dismiss();
                    } else {
                        this._notificationsService.error('Registro de Inventario', 'la combinacion de producto, tienda y proveedor ya existe');
                    }
                } else {
                    this._notificationsService.error('la cantidad solicitada no esta disponible en stock');
                }
            }
        }
    }

    public formatForm(): StoreInventory {
        //this.productForm.controls['serial'].enable();
        let product = new StoreInventory();
        product.product_serial = this.productForm.value.product_serial[0].id;
        product.store_code = this.productForm.value.store_code[0].id;
        product.quantity = this.productForm.value.quantity;
        product.purchaseDate = this.productForm.value.purchaseDate;
        product.inventory_serial = this.productForm.value.inventory_serial;
        return product;
    }

    public validateStock(): boolean {
        let product = this.productList.find(x => x.id === this.productForm.value.product_serial[0].id);
        if (product.quantity - this.productForm.value.quantity > 0) {
            return true;
        } else {
            return false;
        }
    }

    public format(event) {
        if (event) {
            if (event.day && event.month && event.year) {
                this.productForm.get('purchaseDate').setValue(new Date(event.year + '/' + event.month + '/' + event.day));
            }
        }
    }
}