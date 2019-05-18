import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ServiceEndpointsesServiceProxy, CreateOrEditServiceEndpointsDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditServiceEndpointsModal',
    templateUrl: './create-or-edit-serviceEndpoints-modal.component.html'
})
export class CreateOrEditServiceEndpointsModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    serviceEndpoints: CreateOrEditServiceEndpointsDto = new CreateOrEditServiceEndpointsDto();



    constructor(
        injector: Injector,
        private _serviceEndpointsesServiceProxy: ServiceEndpointsesServiceProxy
    ) {
        super(injector);
    }

    show(serviceEndpointsId?: number): void {

        if (!serviceEndpointsId) {
            this.serviceEndpoints = new CreateOrEditServiceEndpointsDto();
            this.serviceEndpoints.id = serviceEndpointsId;

            this.active = true;
            this.modal.show();
        } else {
            this._serviceEndpointsesServiceProxy.getServiceEndpointsForEdit(serviceEndpointsId).subscribe(result => {
                this.serviceEndpoints = result.serviceEndpoints;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._serviceEndpointsesServiceProxy.createOrEdit(this.serviceEndpoints)
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
