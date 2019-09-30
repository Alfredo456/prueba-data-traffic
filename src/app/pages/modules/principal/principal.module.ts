import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { PrincipalListProductComponent } from './list/product/principal_list_product';
import { PrincipalCreateUpdateProductComponent } from './create_update/product/principal_create_update_product';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
    declarations: [
        PrincipalComponent,
        PrincipalListProductComponent,
        PrincipalCreateUpdateProductComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        SharedModule,
        AngularMultiSelectModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: []
})
export class PrincipalModule { }
