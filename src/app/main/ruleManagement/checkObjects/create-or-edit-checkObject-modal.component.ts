import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { CheckObjectsServiceProxy, CreateOrEditCheckObjectDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditCheckObjectModal',
    templateUrl: './create-or-edit-checkObject-modal.component.html'
})
export class CreateOrEditCheckObjectModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    checkObject: CreateOrEditCheckObjectDto = new CreateOrEditCheckObjectDto();



    constructor(
        injector: Injector,
        private _checkObjectsServiceProxy: CheckObjectsServiceProxy
    ) {
        super(injector);
    }

    show(checkObjectId?: number): void {

        if (!checkObjectId) {
            this.checkObject = new CreateOrEditCheckObjectDto();
            this.checkObject.id = checkObjectId;

            this.active = true;
            this.modal.show();
        } else {
            this._checkObjectsServiceProxy.getCheckObjectForEdit(checkObjectId).subscribe(result => {
                this.checkObject = result.checkObject;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._checkObjectsServiceProxy.createOrEdit(this.checkObject)
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
