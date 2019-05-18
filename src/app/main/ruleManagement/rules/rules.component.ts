import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { RulesServiceProxy, RuleDto , RuleDtoCheckObject, RuleDtoValidationFunction, RuleDtoActionType, RuleDtoPages } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditRuleModalComponent } from './create-or-edit-rule-modal.component';
import { ViewRuleModalComponent } from './view-rule-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './rules.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class RulesComponent extends AppComponentBase {

    @ViewChild('createOrEditRuleModal') createOrEditRuleModal: CreateOrEditRuleModalComponent;
    @ViewChild('viewRuleModalComponent') viewRuleModal: ViewRuleModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    checkObjectFilter = -1;
    paramsFilter = '';
    pagesFilter = -1;
    validationFunctionFilter = -1;
    actionTypeFilter = -1;
    alertFilter = -1;
    statusFilter = -1;

    checkObject = RuleDtoCheckObject;
    validationFunction = RuleDtoValidationFunction;
    actionType = RuleDtoActionType;
    sitePageNames = RuleDtoPages;



    constructor(
        injector: Injector,
        private _rulesServiceProxy: RulesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getRules(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._rulesServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.checkObjectFilter,
            this.paramsFilter,
            this.pagesFilter,
            this.validationFunctionFilter,
            this.actionTypeFilter,
            this.alertFilter,
            this.statusFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createRule(): void {
        this.createOrEditRuleModal.show();
    }

    deleteRule(rule: RuleDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._rulesServiceProxy.delete(rule.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._rulesServiceProxy.getRulesToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.checkObjectFilter,
            this.paramsFilter,
            this.pagesFilter,
            this.validationFunctionFilter,
            this.actionTypeFilter,
            this.alertFilter,
            this.statusFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
