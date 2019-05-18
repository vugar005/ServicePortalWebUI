import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTemplatePageForViewDto, TemplatePageDto , TemplatePageDtoPageName} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTemplatePageModal',
    templateUrl: './view-templatePage-modal.component.html'
})
export class ViewTemplatePageModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTemplatePageForViewDto;
    sitePageNames = TemplatePageDtoPageName;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTemplatePageForViewDto();
        this.item.templatePage = new TemplatePageDto();
    }

    show(item: GetTemplatePageForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
