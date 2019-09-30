import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable()
export class LocalStorageService {


    constructor() { }

    // public clearQuotationInformation() {
    //     JSON.parse(localStorage.getItem('EMS_QUOTATION_INFORMATION_FORM'));
    //     localStorage.setItem('EMS_QUOTATION_INFORMATION_FORM', JSON.stringify(newPayload));
    //     localStorage.removeItem('EMS_QUOTATION_INFORMATION_FORM');
    // }

    public setProduct(product: Product): Boolean {
        if (localStorage.getItem('PRODUCT')) {
            let listProducts = JSON.parse(localStorage.getItem('PRODUCT'));
            if (listProducts.find(x => x.serial === product.serial)) {
                return false;
            } else {
                listProducts.push(product);
                localStorage.setItem('PRODUCT', JSON.stringify(listProducts));
                return true;
            }
        } else {
            localStorage.setItem('PRODUCT', JSON.stringify([product]));
            return true;
        }
    }
}
