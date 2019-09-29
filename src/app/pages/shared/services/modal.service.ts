import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {


    constructor(private _modalService: NgbModal) { }


    public openModal(content: any, options: NgbModalOptions) {
        this._modalService.open(content, options).result.then(() => { }, () => { });
    }
}
