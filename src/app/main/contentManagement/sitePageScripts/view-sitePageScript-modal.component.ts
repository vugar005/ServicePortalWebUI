import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetSitePageScriptForViewDto, SitePageScriptDto , SitePageScriptDtoPageName, SitePageScriptDtoPosition, SitePageScriptDtoContentType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewSitePageScriptModal',
    templateUrl: './view-sitePageScript-modal.component.html'
})
export class ViewSitePageScriptModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetSitePageScriptForViewDto;
    sitePageNames = SitePageScriptDtoPageName;
    pageScriptPosition = SitePageScriptDtoPosition;
    contentType = SitePageScriptDtoContentType;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetSitePageScriptForViewDto();
        this.item.sitePageScript = new SitePageScriptDto();
    }

    show(item: GetSitePageScriptForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
