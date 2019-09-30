import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import * as _ from 'lodash';
import { Provider } from '../models/provider.model';
import { Store } from '../models/store.model';
import { StoreInventory } from '../models/store_inventory.model';

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



    public setProvider(provider: Provider): Boolean {
        if (localStorage.getItem('PROVIDER')) {
            let listProviders = JSON.parse(localStorage.getItem('PROVIDER'));
            if (listProviders.find(x => x.nickname === provider.nickname)) {
                return false;
            } else {
                listProviders.push(provider);
                localStorage.setItem('PROVIDER', JSON.stringify(listProviders));
                return true;
            }
        } else {
            localStorage.setItem('PROVIDER', JSON.stringify([provider]));
            return true;
        }
    }

    public getAllProvider(): Array<Provider> {
        if (localStorage.getItem('PROVIDER')) {
            const listProviders = JSON.parse(localStorage.getItem('PROVIDER'));
            return listProviders;
        }
    }

    public getProviderByNickname(nickname: string): Provider {
        if (localStorage.getItem('PROVIDER')) {
            const listProviders = JSON.parse(localStorage.getItem('PROVIDER'));
            return listProviders.find(x => x.nickname === nickname);
        }
    }

    public updateProvider(provider: Provider): Boolean {
        if (localStorage.getItem('PROVIDER')) {
            const listProviders = JSON.parse(localStorage.getItem('PROVIDER'));
            listProviders.forEach(element => {
                if (element.nickname === provider.nickname) {
                    element.name = provider.name;
                    element.lastName = provider.lastName;
                    element.birthDate = provider.birthDate;
                }
            });
            localStorage.setItem('PROVIDER', JSON.stringify(listProviders));
            return true;
        }
        return false;
    }
    public deleteProvider(nickname: string): Boolean {
        if (localStorage.getItem('PROVIDER')) {
            const listProviders = JSON.parse(localStorage.getItem('PROVIDER'));
            listProviders.splice(listProviders.findIndex(x => x.nickname === nickname), 1);
            localStorage.setItem('PROVIDER', JSON.stringify(listProviders));
            return true;
        }
        return false;
    }




    public setStore(store: Store): Boolean {
        if (localStorage.getItem('STORE')) {
            let listStores = JSON.parse(localStorage.getItem('STORE'));
            if (listStores.find(x => x.code === store.code)) {
                return false;
            } else {
                listStores.push(store);
                localStorage.setItem('STORE', JSON.stringify(listStores));
                return true;
            }
        } else {
            localStorage.setItem('STORE', JSON.stringify([store]));
            return true;
        }
    }

    public getAllStore(): Array<Store> {
        if (localStorage.getItem('STORE')) {
            const listStores = JSON.parse(localStorage.getItem('STORE'));
            return listStores;
        }
    }

    public getStoreByCode(code: string): Store {
        if (localStorage.getItem('STORE')) {
            const listStores = JSON.parse(localStorage.getItem('STORE'));
            return listStores.find(x => x.code === code);
        }
    }

    public updateStore(store: Store): Boolean {
        if (localStorage.getItem('STORE')) {
            const listStores = JSON.parse(localStorage.getItem('STORE'));
            listStores.forEach(element => {
                if (element.code === store.code) {
                    element.name = store.name;
                    element.address = store.address;
                }
            });
            localStorage.setItem('STORE', JSON.stringify(listStores));
            return true;
        }
        return false;
    }
    public deleteStore(code: string): Boolean {
        if (localStorage.getItem('STORE')) {
            const listStores = JSON.parse(localStorage.getItem('STORE'));
            listStores.splice(listStores.findIndex(x => x.code === code), 1);
            localStorage.setItem('STORE', JSON.stringify(listStores));
            return true;
        }
        return false;
    }

    public setInventory(inventory: StoreInventory): Boolean {
        if (localStorage.getItem('STORE_INVENTORY')) {
            let listStoresInventory = JSON.parse(localStorage.getItem('STORE_INVENTORY'));
            if (listStoresInventory.find(x => ((x.store_code === inventory.store_code) && (x.product_serial === inventory.product_serial) && (x.provider_nickname === inventory.provider_nickname)))) {
                return false;
            } else {
                listStoresInventory.push(inventory);
                localStorage.setItem('STORE_INVENTORY', JSON.stringify(listStoresInventory));
                return true;
            }
        } else {
            localStorage.setItem('STORE_INVENTORY', JSON.stringify([inventory]));
            return true;
        }
    }

    public getAllIventory(): Array<StoreInventory> {
        if (localStorage.getItem('STORE_INVENTORY')) {
            const listStoresInventory = JSON.parse(localStorage.getItem('STORE_INVENTORY'));
            return listStoresInventory;
        }
    }

    public getInventoryById(store_code: string, product_serial: string, provider_nickname: string): StoreInventory {
        if (localStorage.getItem('STORE_INVENTORY')) {
            const listStoresInventory = JSON.parse(localStorage.getItem('STORE_INVENTORY'));
            return listStoresInventory.find(x => ((x.store_code === store_code) && (x.product_serial === product_serial) && (x.provider_nickname === provider_nickname)));
        }
    }

    public updateIventory(inventory: StoreInventory): Boolean {
        if (localStorage.getItem('STORE_INVENTORY')) {
            const listStoresInventory = JSON.parse(localStorage.getItem('STORE_INVENTORY'));
            listStoresInventory.forEach(element => {
                if (element.store_code === inventory.store_code && element.product_serial === inventory.product_serial && element.provider_nickname === inventory.provider_nickname) {
                    element.quantity = inventory.quantity;
                    element.purchaseDate = inventory.purchaseDate;
                }
            });
            localStorage.setItem('STORE_INVENTORY', JSON.stringify(listStoresInventory));
            return true;
        }
        return false;
    }
    public deleteIventory(store_code: string, product_serial: string, provider_nickname: string): Boolean {
        if (localStorage.getItem('STORE_INVENTORY')) {
            const listStoresInventory = JSON.parse(localStorage.getItem('STORE_INVENTORY'));
            listStoresInventory.splice(listStoresInventory.findIndex(x => ((x.store_code === store_code) && (x.product_serial === product_serial) && (x.provider_nickname === provider_nickname))), 1);
            localStorage.setItem('STORE_INVENTORY', JSON.stringify(listStoresInventory));
            return true;
        }
        return false;
    }
}
