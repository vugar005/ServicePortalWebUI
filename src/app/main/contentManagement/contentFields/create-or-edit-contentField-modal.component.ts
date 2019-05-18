import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ContentFieldsServiceProxy, CreateOrEditContentFieldDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditContentFieldModal',
    templateUrl: './create-or-edit-contentField-modal.component.html'
})
export class CreateOrEditContentFieldModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    contentField: CreateOrEditContentFieldDto = new CreateOrEditContentFieldDto();



    constructor(
        injector: Injector,
        private _contentFieldsServiceProxy: ContentFieldsServiceProxy
    ) {
        super(injector);
    }

    show(contentFieldId?: number): void {

        if (!contentFieldId) {
            this.contentField = new CreateOrEditContentFieldDto();
            this.contentField.id = contentFieldId;

            this.active = true;
            this.modal.show();
        } else {
            this._contentFieldsServiceProxy.getContentFieldForEdit(contentFieldId).subscribe(result => {
                this.contentField = result.contentField;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._contentFieldsServiceProxy.createOrEdit(this.contentField)
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
