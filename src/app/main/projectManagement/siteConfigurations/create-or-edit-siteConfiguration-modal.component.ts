import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { SiteConfigurationsServiceProxy, CreateOrEditSiteConfigurationDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditSiteConfigurationModal',
    templateUrl: './create-or-edit-siteConfiguration-modal.component.html'
})
export class CreateOrEditSiteConfigurationModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    siteConfiguration: CreateOrEditSiteConfigurationDto = new CreateOrEditSiteConfigurationDto();



    constructor(
        injector: Injector,
        private _siteConfigurationsServiceProxy: SiteConfigurationsServiceProxy
    ) {
        super(injector);
    }

    show(siteConfigurationId?: number): void {

        if (!siteConfigurationId) {
            this.siteConfiguration = new CreateOrEditSiteConfigurationDto();
            this.siteConfiguration.id = siteConfigurationId;

            this.active = true;
            this.modal.show();
        } else {
            this._siteConfigurationsServiceProxy.getSiteConfigurationForEdit(siteConfigurationId).subscribe(result => {
                this.siteConfiguration = result.siteConfiguration;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._siteConfigurationsServiceProxy.createOrEdit(this.siteConfiguration)
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
