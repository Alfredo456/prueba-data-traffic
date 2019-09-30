import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/pages/shared/services/form.service';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { Store } from 'src/app/pages/shared/models/store.model';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';

@Component({
    selector: 'app-component-principal-store-create-update',
    templateUrl: 'principal_create_update_store.html'
})
export class PrincipalCreateUpdateStoreComponent implements OnInit {

    public storeForm: FormGroup;
    @Input('close') close: any;
    @Input('dismiss') dismiss: any;
    @Input('code') code?: any;

    constructor(private fb: FormBuilder,
        public _formService: FormService,
        private _localStorageService: LocalStorageService,
        private _notificationsService: NotificationsService, private _reloadService: ReloadService) {
    }

    ngOnInit(): void {
        if (this.code) {
            this.initEditForm();
        } else {
            this.initForm();
        }
    }

    public initForm() {
        this.storeForm = this.fb.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            address: [null, [Validators.required]],
        });
    }

    public initEditForm() {
        const store = this._localStorageService.getStoreByCode(this.code);
        this.storeForm = this.fb.group({
            code: [store.code, [Validators.required]],
            name: [store.name, [Validators.required]],
            address: [store.address, [Validators.required]],
        });
        //this.storeForm.controls['code'].disable();
    }

    public save() {
        this._formService.markAllAsTouched(this.storeForm);
        if (this.storeForm.valid) {
            if (this.code) {
                if (this._localStorageService.updateStore(this.formatForm())) {
                    this._notificationsService.success('Edición de Tienda', 'edición exitosa');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Edición de Tienda', 'error');
                }
            } else {
                if (this._localStorageService.setStore(this.formatForm())) {
                    this._notificationsService.success('Registro de Tienda', 'registro exitoso');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Registro de Tienda', 'codigo existente');
                }
            }
        }
    }

    public formatForm(): Store {
        //this.storeForm.controls['code'].enable();
        let store = new Store();
        store.code = this.storeForm.value.code;
        store.name = this.storeForm.value.name;
        store.address = this.storeForm.value.address;
        return store;
    }
}
