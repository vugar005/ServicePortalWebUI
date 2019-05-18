import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetContentFieldForViewDto, ContentFieldDto , ContentFieldDtoFieldType, ContentFieldDtoValueType, ContentFieldDtoLanguage, ContentFieldDtoContentType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewContentFieldModal',
    templateUrl: './view-contentField-modal.component.html'
})
export class ViewContentFieldModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetContentFieldForViewDto;
    fieldType = ContentFieldDtoFieldType;
    fieldValueType = ContentFieldDtoValueType;
    language = ContentFieldDtoLanguage;
    contentType = ContentFieldDtoContentType;    

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetContentFieldForViewDto();
        this.item.contentField = new ContentFieldDto();
    }

    show(item: GetContentFieldForViewDto): void {
        if (item.contentField.valueType == 2) {
            item.contentField.value = 'data:image/jpeg;base64,' + item.contentField.value;
        }
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
