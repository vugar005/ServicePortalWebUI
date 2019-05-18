import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetSitePageForViewDto, SitePageDto , SitePageDtoType, SitePageDtoLanguage1, SitePageDtoContentType1, SitePageDtoLanguage2, SitePageDtoContentType2, SitePageDtoLanguage3, SitePageDtoContentType3} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewSitePageModal',
    templateUrl: './view-sitePage-modal.component.html'
})
export class ViewSitePageModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetSitePageForViewDto;
    pageType = SitePageDtoType;
    language = SitePageDtoLanguage1;
    contentType = SitePageDtoContentType1;
    language2 = SitePageDtoLanguage2;
    contentType2 = SitePageDtoContentType2;
    language3 = SitePageDtoLanguage3;
    contentType3 = SitePageDtoContentType3;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetSitePageForViewDto();
        this.item.sitePage = new SitePageDto();
    }

    show(item: GetSitePageForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
