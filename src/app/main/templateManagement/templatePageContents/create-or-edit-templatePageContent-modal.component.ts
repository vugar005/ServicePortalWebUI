import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { TemplatePageContentsServiceProxy, CreateOrEditTemplatePageContentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditTemplatePageContentModal',
    templateUrl: './create-or-edit-templatePageContent-modal.component.html'
})
export class CreateOrEditTemplatePageContentModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    templatePageContent: CreateOrEditTemplatePageContentDto = new CreateOrEditTemplatePageContentDto();



    constructor(
        injector: Injector,
        private _templatePageContentsServiceProxy: TemplatePageContentsServiceProxy
    ) {
        super(injector);
    }

    show(templatePageContentId?: number): void {

        if (!templatePageContentId) {
            this.templatePageContent = new CreateOrEditTemplatePageContentDto();
            this.templatePageContent.id = templatePageContentId;

            this.active = true;
            this.modal.show();
        } else {
            this._templatePageContentsServiceProxy.getTemplatePageContentForEdit(templatePageContentId).subscribe(result => {
                this.templatePageContent = result.templatePageContent;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._templatePageContentsServiceProxy.createOrEdit(this.templatePageContent)
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
