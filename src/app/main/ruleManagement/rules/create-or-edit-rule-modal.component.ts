import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { RulesServiceProxy, CreateOrEditRuleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditRuleModal',
    templateUrl: './create-or-edit-rule-modal.component.html'
})
export class CreateOrEditRuleModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    rule: CreateOrEditRuleDto = new CreateOrEditRuleDto();



    constructor(
        injector: Injector,
        private _rulesServiceProxy: RulesServiceProxy
    ) {
        super(injector);
    }

    show(ruleId?: number): void {

        if (!ruleId) {
            this.rule = new CreateOrEditRuleDto();
            this.rule.id = ruleId;

            this.active = true;
            this.modal.show();
        } else {
            this._rulesServiceProxy.getRuleForEdit(ruleId).subscribe(result => {
                this.rule = result.rule;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._rulesServiceProxy.createOrEdit(this.rule)
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
