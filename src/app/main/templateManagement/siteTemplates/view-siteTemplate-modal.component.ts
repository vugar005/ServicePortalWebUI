import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetSiteTemplateForViewDto, SiteTemplateDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewSiteTemplateModal',
    templateUrl: './view-siteTemplate-modal.component.html'
})
export class ViewSiteTemplateModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetSiteTemplateForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetSiteTemplateForViewDto();
        this.item.siteTemplate = new SiteTemplateDto();
    }

    show(item: GetSiteTemplateForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
