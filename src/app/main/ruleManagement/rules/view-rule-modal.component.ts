import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetRuleForViewDto, RuleDto , RuleDtoCheckObject, RuleDtoValidationFunction, RuleDtoActionType, RuleDtoPages} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewRuleModal',
    templateUrl: './view-rule-modal.component.html'
})
export class ViewRuleModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetRuleForViewDto;
    checkObject = RuleDtoCheckObject;
    validationFunction = RuleDtoValidationFunction;
    actionType = RuleDtoActionType;
    sitePageNames = RuleDtoPages;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetRuleForViewDto();
        this.item.rule = new RuleDto();
    }

    show(item: GetRuleForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
