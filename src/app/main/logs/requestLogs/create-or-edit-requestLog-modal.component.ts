import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { RequestLogsServiceProxy, CreateOrEditRequestLogDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditRequestLogModal',
    templateUrl: './create-or-edit-requestLog-modal.component.html'
})
export class CreateOrEditRequestLogModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    requestLog: CreateOrEditRequestLogDto = new CreateOrEditRequestLogDto();



    constructor(
        injector: Injector,
        private _requestLogsServiceProxy: RequestLogsServiceProxy
    ) {
        super(injector);
    }

    show(requestLogId?: number): void {

        if (!requestLogId) {
            this.requestLog = new CreateOrEditRequestLogDto();
            this.requestLog.id = requestLogId;

            this.active = true;
            this.modal.show();
        } else {
            this._requestLogsServiceProxy.getRequestLogForEdit(requestLogId).subscribe(result => {
                this.requestLog = result.requestLog;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._requestLogsServiceProxy.createOrEdit(this.requestLog)
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
