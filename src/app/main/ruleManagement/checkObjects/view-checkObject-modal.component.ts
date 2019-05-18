import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetCheckObjectForViewDto, CheckObjectDto , CheckObjectDtoSource, CheckObjectDtoCheckType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCheckObjectModal',
    templateUrl: './view-checkObject-modal.component.html'
})
export class ViewCheckObjectModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCheckObjectForViewDto;
    checkObjectSource = CheckObjectDtoSource;
    checkType = CheckObjectDtoCheckType;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCheckObjectForViewDto();
        this.item.checkObject = new CheckObjectDto();
    }

    show(item: GetCheckObjectForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
