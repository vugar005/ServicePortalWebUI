import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTemplatePageContentForViewDto, TemplatePageContentDto , TemplatePageContentDtoPageName, TemplatePageContentDtoContentType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTemplatePageContentModal',
    templateUrl: './view-templatePageContent-modal.component.html'
})
export class ViewTemplatePageContentModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTemplatePageContentForViewDto;
    sitePageNames = TemplatePageContentDtoPageName;
    contentType = TemplatePageContentDtoContentType;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTemplatePageContentForViewDto();
        this.item.templatePageContent = new TemplatePageContentDto();
    }

    show(item: GetTemplatePageContentForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
