import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { SmtpSettingsServiceProxy, CreateOrEditSmtpSettingDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditSmtpSettingModal',
    templateUrl: './create-or-edit-smtpSetting-modal.component.html'
})
export class CreateOrEditSmtpSettingModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    smtpSetting: CreateOrEditSmtpSettingDto = new CreateOrEditSmtpSettingDto();



    constructor(
        injector: Injector,
        private _smtpSettingsServiceProxy: SmtpSettingsServiceProxy
    ) {
        super(injector);
    }

    show(smtpSettingId?: number): void {

        if (!smtpSettingId) {
            this.smtpSetting = new CreateOrEditSmtpSettingDto();
            this.smtpSetting.id = smtpSettingId;

            this.active = true;
            this.modal.show();
        } else {
            this._smtpSettingsServiceProxy.getSmtpSettingForEdit(smtpSettingId).subscribe(result => {
                this.smtpSetting = result.smtpSetting;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._smtpSettingsServiceProxy.createOrEdit(this.smtpSetting)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
