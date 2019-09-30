import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import * as _ from 'lodash';

@Injectable()
export class LocalStorageService {


    constructor() { }

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

    public getAllProducts(): Array<Product> {
        if (localStorage.getItem('PRODUCT')) {
            const listProducts = JSON.parse(localStorage.getItem('PRODUCT'));
            return listProducts;
        }
    }

    public getProductsBySerial(serial: string): Product {
        if (localStorage.getItem('PRODUCT')) {
            const listProducts = JSON.parse(localStorage.getItem('PRODUCT'));
            return listProducts.find(x => x.serial === serial);
        }
    }

    public updateProduct(product: Product): Boolean {
        if (localStorage.getItem('PRODUCT')) {
            const listProducts = JSON.parse(localStorage.getItem('PRODUCT'));
            listProducts.forEach(element => {
                if (element.serial === product.serial) {
                    element.name = product.name;
                }
            });
            localStorage.setItem('PRODUCT', JSON.stringify(listProducts));
            return true;
        }
        return false;
    }
    public deleteProduct(serial: string): Boolean {
        if (localStorage.getItem('PRODUCT')) {
            const listProducts = JSON.parse(localStorage.getItem('PRODUCT'));
            listProducts.splice(listProducts.findIndex(x => x.serial === serial), 1);
            localStorage.setItem('PRODUCT', JSON.stringify(listProducts));
            return true;
        }
        return false;
    }
}
