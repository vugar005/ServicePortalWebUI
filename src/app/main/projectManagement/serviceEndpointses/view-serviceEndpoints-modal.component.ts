import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetServiceEndpointsForViewDto, ServiceEndpointsDto , ServiceEndpointsDtoServiceEntity} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewServiceEndpointsModal',
    templateUrl: './view-serviceEndpoints-modal.component.html'
})
export class ViewServiceEndpointsModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetServiceEndpointsForViewDto;
    projectEntity = ServiceEndpointsDtoServiceEntity;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetServiceEndpointsForViewDto();
        this.item.serviceEndpoints = new ServiceEndpointsDto();
    }

    show(item: GetServiceEndpointsForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
