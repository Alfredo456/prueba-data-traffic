import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class ProductService {

    @Output() reload: EventEmitter<any> = new EventEmitter();

    reloadAction() {
        this.reload.emit();
    }
}
