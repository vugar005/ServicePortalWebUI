import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TemplatePagesServiceProxy, CreateOrEditTemplatePageDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTemplatePageModal',
    templateUrl: './create-or-edit-templatePage-modal.component.html'
})
export class CreateOrEditTemplatePageModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    templatePage: CreateOrEditTemplatePageDto = new CreateOrEditTemplatePageDto();



    constructor(
        injector: Injector,
        private _templatePagesServiceProxy: TemplatePagesServiceProxy
    ) {
        super(injector);
    }

    show(templatePageId?: number): void {

        if (!templatePageId) {
            this.templatePage = new CreateOrEditTemplatePageDto();
            this.templatePage.id = templatePageId;

            this.active = true;
            this.modal.show();
        } else {
            this._templatePagesServiceProxy.getTemplatePageForEdit(templatePageId).subscribe(result => {
                this.templatePage = result.templatePage;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._templatePagesServiceProxy.createOrEdit(this.templatePage)
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
