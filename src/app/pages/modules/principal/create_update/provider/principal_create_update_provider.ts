import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/pages/shared/services/form.service';
import { LocalStorageService } from 'src/app/pages/shared/services/localstorage.service';
import { Provider } from 'src/app/pages/shared/models/provider.model';
import { NotificationsService } from 'angular2-notifications';
import { ReloadService } from '../../services/reload.service';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-component-principal-provider-create-update',
    templateUrl: 'principal_create_update_provider.html'
})
export class PrincipalCreateUpdateProviderComponent implements OnInit {

    public providerForm: FormGroup;
    public fromDate: NgbDateStruct;
    @Input('close') close: any;
    @Input('dismiss') dismiss: any;
    @Input('nickname') nickname?: any;

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
        if (this.nickname) {
            this.initEditForm();
        } else {
            this.initForm();
        }
    }

    public initForm() {
        this.providerForm = this.fb.group({
            nickname: [null, [Validators.required]],
            name: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            birthDate: [null, [Validators.required]],
        });
    }

    public initEditForm() {
        const provider = this._localStorageService.getProviderByNickname(this.nickname);
        this.providerForm = this.fb.group({
            nickname: [provider.nickname, [Validators.required]],
            name: [provider.name, [Validators.required]],
            lastName: [provider.lastName, [Validators.required]],
            birthDate: [provider.birthDate, [Validators.required]],
        });
        //this.providerForm.controls['nickname'].disable();
    }

    public save() {
        this._formService.markAllAsTouched(this.providerForm);
        if (this.providerForm.valid) {
            if (this.nickname) {
                if (this._localStorageService.updateProvider(this.formatForm())) {
                    this._notificationsService.success('Edición de proveedor', 'edición exitosa');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Edición de proveedor', 'error');
                }
            } else {
                if (this._localStorageService.setProvider(this.formatForm())) {
                    this._notificationsService.success('Registro de proveedor', 'registro exitoso');
                    this._reloadService.reloadAction();
                    this.dismiss();
                } else {
                    this._notificationsService.error('Registro de proveedor', 'nickname existente');
                }
            }
        }
    }

    public formatForm(): Provider {
        //this.providerForm.controls['nickname'].enable();
        let provider = new Provider();
        provider.nickname = this.providerForm.value.nickname;
        provider.name = this.providerForm.value.name;
        provider.lastName = this.providerForm.value.lastName;
        provider.birthDate = this.providerForm.value.birthDate;
        return provider;
    }

    public format(event) {
        if (event) {
            if (event.day && event.month && event.year) {
                this.providerForm.get('birthDate').setValue(new Date(event.year + '/' + event.month + '/' + event.day));
            }
        }
    }
}
