import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { SiteTemplatesServiceProxy, CreateOrEditSiteTemplateDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditSiteTemplateModal',
    templateUrl: './create-or-edit-siteTemplate-modal.component.html'
})
export class CreateOrEditSiteTemplateModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    siteTemplate: CreateOrEditSiteTemplateDto = new CreateOrEditSiteTemplateDto();



    constructor(
        injector: Injector,
        private _siteTemplatesServiceProxy: SiteTemplatesServiceProxy
    ) {
        super(injector);
    }

    show(siteTemplateId?: number): void {

        if (!siteTemplateId) {
            this.siteTemplate = new CreateOrEditSiteTemplateDto();
            this.siteTemplate.id = siteTemplateId;

            this.active = true;
            this.modal.show();
        } else {
            this._siteTemplatesServiceProxy.getSiteTemplateForEdit(siteTemplateId).subscribe(result => {
                this.siteTemplate = result.siteTemplate;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._siteTemplatesServiceProxy.createOrEdit(this.siteTemplate)
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
