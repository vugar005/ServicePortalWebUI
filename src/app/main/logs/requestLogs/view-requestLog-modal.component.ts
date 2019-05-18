import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetRequestLogForViewDto, RequestLogDto,  RequestLogDtoDeviceType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewRequestLogModal',
    templateUrl: './view-requestLog-modal.component.html'
})
export class ViewRequestLogModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetRequestLogForViewDto;
    deviceType = RequestLogDtoDeviceType;
    deviceTypeByRule = RequestLogDtoDeviceType;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetRequestLogForViewDto();
        this.item.requestLog = new RequestLogDto();
    }

    show(item: GetRequestLogForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
