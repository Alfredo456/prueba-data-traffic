import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { PrincipalListProductComponent } from './list/product/principal_list_product';
import { PrincipalCreateUpdateProductComponent } from './create_update/product/principal_create_update_product';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ReloadService } from './services/reload.service';
import { PrincipalCreateUpdateProviderComponent } from './create_update/provider/principal_create_update_provider';
import { PrincipalListProviderComponent } from './list/provider/principal_list_provider';
import { PrincipalCreateUpdateStoreComponent } from './create_update/store/principal_create_update_store';
import { PrincipalListStoreComponent } from './list/store/principal_list_store';
import { PrincipalCreateUpdateStoreInventoryComponent } from './create_update/store_inventory/principal_create_update_storeInventory';
import { PrincipalListStoreInventoryComponent } from './list/store_inventory/principal_list_storeInventory';


@NgModule({
    declarations: [
        PrincipalComponent,
        PrincipalListProductComponent,
        PrincipalCreateUpdateProductComponent,
        PrincipalCreateUpdateProviderComponent,
        PrincipalListProviderComponent,
        PrincipalCreateUpdateStoreComponent,
        PrincipalListStoreComponent,
        PrincipalCreateUpdateStoreInventoryComponent,
        PrincipalListStoreInventoryComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        SharedModule,
        AngularMultiSelectModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [ReloadService],
    bootstrap: []
})
export class PrincipalModule { }
