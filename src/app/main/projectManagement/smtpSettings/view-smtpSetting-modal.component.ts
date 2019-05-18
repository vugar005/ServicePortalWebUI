import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetSmtpSettingForViewDto, SmtpSettingDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewSmtpSettingModal',
    templateUrl: './view-smtpSetting-modal.component.html'
})
export class ViewSmtpSettingModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetSmtpSettingForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetSmtpSettingForViewDto();
        this.item.smtpSetting = new SmtpSettingDto();
    }

    show(item: GetSmtpSettingForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
