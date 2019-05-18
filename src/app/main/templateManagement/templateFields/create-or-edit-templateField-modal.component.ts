import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TemplateFieldsServiceProxy, CreateOrEditTemplateFieldDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTemplateFieldModal',
    templateUrl: './create-or-edit-templateField-modal.component.html'
})
export class CreateOrEditTemplateFieldModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    templateField: CreateOrEditTemplateFieldDto = new CreateOrEditTemplateFieldDto();



    constructor(
        injector: Injector,
        private _templateFieldsServiceProxy: TemplateFieldsServiceProxy
    ) {
        super(injector);
    }

    show(templateFieldId?: number): void {

        if (!templateFieldId) {
            this.templateField = new CreateOrEditTemplateFieldDto();
            this.templateField.id = templateFieldId;

            this.active = true;
            this.modal.show();
        } else {
            this._templateFieldsServiceProxy.getTemplateFieldForEdit(templateFieldId).subscribe(result => {
                this.templateField = result.templateField;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._templateFieldsServiceProxy.createOrEdit(this.templateField)
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
