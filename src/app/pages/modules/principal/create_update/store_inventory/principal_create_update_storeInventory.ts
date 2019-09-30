import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/pages/shared/services/form.service';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';
import { StoreInventory } from 'src/app/pages/shared/models/store_inventory.model';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-component-principal-store-inventory-create-update',
    templateUrl: 'principal_create_update_storeInventory.html'
})
export class PrincipalCreateUpdateStoreInventoryComponent implements OnInit {

    public productForm: FormGroup;
    public fromDate: NgbDateStruct;
    @Input('close') close: any;
    @Input('dismiss') dismiss: any;
    @Input('product_serial') product_serial?: any;
    @Input('provider_nickname') provider_nickname?: any;
    @Input('store_code') store_code?: any;

    constructor(private fb: FormBuilder,
        public _formService: FormService,
        calendar: NgbCalendar,
        config: NgbDatepickerConfig,
        private _localStorageService: LocalStorageService,
        private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
        config.minDate = { year: 1910, month: 1, day: 1 };
        config.maxDate = calendar.getToday();
    }

    ngOnInit(): void {
        if (this.product_serial && this.provider_nickname && this.store_code) {
            this.initEditForm();
        } else {
            this.initForm();
        }
    }

    public initForm() {
        this.productForm = this.fb.group({
            product_serial: [null, [Validators.required]],
            provider_nickname: [null, [Validators.required]],
            store_code: [null, [Validators.required]],
            quantity: [null, [Validators.required]],
            purchaseDate: [null, [Validators.required]],
        });
    }

    public initEditForm() {
        const product = this._localStorageService.getInventoryById(this.store_code, this.product_serial, this.provider_nickname);
        const date: Date = new Date(product.purchaseDate);
        this.fromDate = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
        this.productForm = this.fb.group({
            product_serial: [product.product_serial, [Validators.required]],
            provider_nickname: [product.provider_nickname, [Validators.required]],
            store_code: [product.store_code, [Validators.required]],
            quantity: [product.quantity, [Validators.required]],
            purchaseDate: [product.purchaseDate, [Validators.required]],
        });
        //this.productForm.controls['serial'].disable();
    }

    public save() {
        this._formService.markAllAsTouched(this.productForm);
        if (this.productForm.valid) {
            if (this.product_serial && this.provider_nickname && this.store_code) {
                if (this._localStorageService.updateIventory(this.formatForm())) {
                    this._notificationsService.success('Edición de Inventario', 'edición exitosa');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Edición de Inventario', 'error');
                }
            } else {
                if (this._localStorageService.setInventory(this.formatForm())) {
                    this._notificationsService.success('Registro de Inventario', 'registro exitoso');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Registro de Inventario', 'la combinacion de producto, tienda y proveedor ya existe');
                }
            }
        }
    }

    public formatForm(): StoreInventory {
        //this.productForm.controls['serial'].enable();
        let product = new StoreInventory();
        product.product_serial = this.productForm.value.product_serial;
        product.store_code = this.productForm.value.store_code;
        product.quantity = this.productForm.value.quantity;
        product.purchaseDate = this.productForm.value.purchaseDate;
        product.provider_nickname = this.productForm.value.provider_nickname;
        return product;
    }

    public format(event) {
        if (event) {
            if (event.day && event.month && event.year) {
                this.productForm.get('purchaseDate').setValue(new Date(event.year + '/' + event.month + '/' + event.day));
            }
        }
    }
}