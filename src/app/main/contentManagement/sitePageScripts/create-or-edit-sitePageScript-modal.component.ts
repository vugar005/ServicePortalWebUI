import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { SitePageScriptsServiceProxy, CreateOrEditSitePageScriptDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditSitePageScriptModal',
    templateUrl: './create-or-edit-sitePageScript-modal.component.html'
})
export class CreateOrEditSitePageScriptModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    sitePageScript: CreateOrEditSitePageScriptDto = new CreateOrEditSitePageScriptDto();



    constructor(
        injector: Injector,
        private _sitePageScriptsServiceProxy: SitePageScriptsServiceProxy
    ) {
        super(injector);
    }

    show(sitePageScriptId?: number): void {

        if (!sitePageScriptId) {
            this.sitePageScript = new CreateOrEditSitePageScriptDto();
            this.sitePageScript.id = sitePageScriptId;

            this.active = true;
            this.modal.show();
        } else {
            this._sitePageScriptsServiceProxy.getSitePageScriptForEdit(sitePageScriptId).subscribe(result => {
                this.sitePageScript = result.sitePageScript;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._sitePageScriptsServiceProxy.createOrEdit(this.sitePageScript)
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
