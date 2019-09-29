import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-component-principal-product-create-update',
    templateUrl: 'principal_create_update_product.html'
})
export class PrincipalCreateUpdateProductComponent {
    @Input('close') close: any;
    @Input('dismiss') dismiss: any;
}
