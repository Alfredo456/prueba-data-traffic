import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/pages/shared/services/form.service';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { Product } from 'src/app/pages/shared/models/product.model';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';
import { SELECTSETTINGS } from 'src/app/pages/shared/util/select.util';

@Component({
    selector: 'app-component-principal-product-create-update',
    templateUrl: 'principal_create_update_product.html'
})
export class PrincipalCreateUpdateProductComponent implements OnInit {

    public productForm: FormGroup;
    public selectedItem: any;
    public setting: any;
    public providersList: Array<any>;

    @Input('close') close: any;
    @Input('dismiss') dismiss: any;
    @Input('serial') serial?: any;

    constructor(private fb: FormBuilder,
        public _formService: FormService,
        private _localStorageService: LocalStorageService,
        private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
        this.selectedItem = null;
        this.setting = SELECTSETTINGS;
    }

    ngOnInit(): void {
        this.initializeList();
        if (this.serial) {
            this.initEditForm();
        } else {
            this.initForm();
        }
    }

    public initForm() {
        this.productForm = this.fb.group({
            serial: [null, [Validators.required]],
            name: [null, [Validators.required]],
            quantity: [null, [Validators.required]],
            provider_nickname: [null, [Validators.required]],
        });
    }

    public initEditForm() {
        const product = this._localStorageService.getProductsBySerial(this.serial);
        this.productForm = this.fb.group({
            serial: [product.serial, [Validators.required]],
            name: [product.name, [Validators.required]],
            quantity: [product.quantity, [Validators.required]],
            provider_nickname: [this.chargeNickname(product.provider_nickname), [Validators.required]],
        });
        //this.productForm.controls['serial'].disable();
        this.selectedItem = this.productForm.value.provider_nickname;
    }

    public initializeList() {
        this.providersList = this._localStorageService.getAllProvider().map((item) => {
            return {
                id: item.nickname,
                itemName: item.name
            };
        });
    }

    public chargeNickname(provider_nickname) {
        return [this.providersList.find(x => x.id === provider_nickname)];
    }

    public save() {
        this._formService.markAllAsTouched(this.productForm);
        if (this.productForm.valid) {
            if (this.serial) {
                if (this._localStorageService.updateProduct(this.formatForm())) {
                    this._notificationsService.success('Edición de Producto', 'edición exitosa');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Edición de Producto', 'error');
                }
            } else {
                if (this._localStorageService.setProduct(this.formatForm())) {
                    this._notificationsService.success('Registro de Producto', 'registro exitoso');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Registro de Producto', 'serial existente');
                }
            }
        }
    }

    public formatForm(): Product {
        //this.productForm.controls['serial'].enable();
        let product = new Product();
        product.serial = this.productForm.value.serial;
        product.name = this.productForm.value.name;
        product.quantity = this.productForm.value.quantity;
        product.provider_nickname = this.productForm.value.provider_nickname[0].id;
        return product;
    }
}
