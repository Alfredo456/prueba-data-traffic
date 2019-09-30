import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/pages/shared/services/form.service';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { Product } from 'src/app/pages/shared/models/product.model';
import { NotificationsService } from 'angular2-notifications';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-component-principal-product-create-update',
    templateUrl: 'principal_create_update_product.html'
})
export class PrincipalCreateUpdateProductComponent implements OnInit {

    public productForm: FormGroup;
    @Input('close') close: any;
    @Input('dismiss') dismiss: any;
    @Input('serial') serial?: any;

    constructor(private fb: FormBuilder,
        public _formService: FormService,
        private _localStorageService: LocalStorageService,
        private _notificationsService: NotificationsService, private _productService: ProductService) {
    }

    ngOnInit(): void {
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
        });
    }

    public initEditForm() {
        const product = this._localStorageService.getProductsBySerial(this.serial);
        this.productForm = this.fb.group({
            serial: [product.serial, [Validators.required]],
            name: [product.name, [Validators.required]],
        });
        //this.productForm.controls['serial'].disable();
    }

    public save() {
        this._formService.markAllAsTouched(this.productForm);
        if (this.productForm.valid) {
            if (this.serial) {
                if (this._localStorageService.updateProduct(this.formatForm())) {
                    this._notificationsService.success('Edición de Producto', 'edición exitosa');
                    this._productService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Edición de Producto', 'error');
                }
            } else {
                if (this._localStorageService.setProduct(this.formatForm())) {
                    this._notificationsService.success('Registro de Producto', 'registro exitoso');
                    this._productService.reloadAction();
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
        return product;
    }
}
