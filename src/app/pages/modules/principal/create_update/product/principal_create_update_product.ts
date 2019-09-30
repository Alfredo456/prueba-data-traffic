import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/pages/shared/services/form.service';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { Product } from 'src/app/pages/shared/models/product.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-component-principal-product-create-update',
    templateUrl: 'principal_create_update_product.html'
})
export class PrincipalCreateUpdateProductComponent implements OnInit {

    public productForm: FormGroup;
    @Input('close') close: any;
    @Input('dismiss') dismiss: any;

    constructor(private fb: FormBuilder,
        public _formService: FormService,
        private _localStorageService: LocalStorageService,
        private _notificationsService: NotificationsService) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    public initForm() {
        this.productForm = this.fb.group({
            serial: [null, [Validators.required]],
            name: [null, [Validators.required]],
        });
    }

    public save() {
        this._formService.markAllAsTouched(this.productForm);
        if (this.productForm.valid) {
            if (this._localStorageService.setProduct(this.formatForm())) {
                this._notificationsService.success('Registro de Producto', 'registro exitoso');
                this.dismiss();
            } else {
                this._notificationsService.error('Registro de Producto', 'serial existente');
            }
        }
    }

    public formatForm(): Product {
        let product = new Product();
        product.serial = this.productForm.value.serial;
        product.name = this.productForm.value.name;
        return product;
    }
}
