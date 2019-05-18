import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetScheduleForViewDto, ScheduleDto , ScheduleDtoSiteStatus} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewScheduleModal',
    templateUrl: './view-schedule-modal.component.html'
})
export class ViewScheduleModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetScheduleForViewDto;
    siteStatus = ScheduleDtoSiteStatus;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetScheduleForViewDto();
        this.item.schedule = new ScheduleDto();
    }

    show(item: GetScheduleForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
