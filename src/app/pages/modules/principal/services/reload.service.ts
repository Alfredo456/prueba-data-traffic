import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class ReloadService {

    @Output() reload: EventEmitter<any> = new EventEmitter();

    reloadAction() {
        this.reload.emit();
    }
}
