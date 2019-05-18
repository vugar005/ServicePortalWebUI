import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { SitePagesServiceProxy, CreateOrEditSitePageDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditSitePageModal',
    templateUrl: './create-or-edit-sitePage-modal.component.html'
})
export class CreateOrEditSitePageModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    sitePage: CreateOrEditSitePageDto = new CreateOrEditSitePageDto();



    constructor(
        injector: Injector,
        private _sitePagesServiceProxy: SitePagesServiceProxy
    ) {
        super(injector);
    }

    show(sitePageId?: number): void {

        if (!sitePageId) {
            this.sitePage = new CreateOrEditSitePageDto();
            this.sitePage.id = sitePageId;

            this.active = true;
            this.modal.show();
        } else {
            this._sitePagesServiceProxy.getSitePageForEdit(sitePageId).subscribe(result => {
                this.sitePage = result.sitePage;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._sitePagesServiceProxy.createOrEdit(this.sitePage)
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
