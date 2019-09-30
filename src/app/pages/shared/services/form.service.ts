import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormService {


    constructor() { }


    public isValid(form: FormGroup, key: string) {
        return form.get(key).touched ? form.get(key).valid : '';
    }
    public markAllAsTouched(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            form.get(key).markAsTouched();
        });
    }
}
