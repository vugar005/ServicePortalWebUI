import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetSiteConfigurationForViewDto, SiteConfigurationDto , SiteConfigurationDtoStatus, SiteConfigurationDtoDefaultLanguage} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewSiteConfigurationModal',
    templateUrl: './view-siteConfiguration-modal.component.html'
})
export class ViewSiteConfigurationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetSiteConfigurationForViewDto;
    siteStatus = SiteConfigurationDtoStatus;
    language = SiteConfigurationDtoDefaultLanguage;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetSiteConfigurationForViewDto();
        this.item.siteConfiguration = new SiteConfigurationDto();
    }

    show(item: GetSiteConfigurationForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
