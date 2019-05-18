import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetTemplateFieldForViewDto, TemplateFieldDto , TemplateFieldDtoType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTemplateFieldModal',
    templateUrl: './view-templateField-modal.component.html'
})
export class ViewTemplateFieldModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTemplateFieldForViewDto;
    fieldType = TemplateFieldDtoType;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetTemplateFieldForViewDto();
        this.item.templateField = new TemplateFieldDto();
    }

    show(item: GetTemplateFieldForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
