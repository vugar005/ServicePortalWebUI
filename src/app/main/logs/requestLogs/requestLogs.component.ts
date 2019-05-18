import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { RequestLogsServiceProxy, RequestLogDto , RequestLogDtoDeviceType } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditRequestLogModalComponent } from './create-or-edit-requestLog-modal.component';
import { ViewRequestLogModalComponent } from './view-requestLog-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './requestLogs.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class RequestLogsComponent extends AppComponentBase {

    @ViewChild('createOrEditRequestLogModal') createOrEditRequestLogModal: CreateOrEditRequestLogModalComponent;
    @ViewChild('viewRequestLogModalComponent') viewRequestLogModal: ViewRequestLogModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjecIdFilter : number;
		maxProjecIdFilterEmpty : number;
		minProjecIdFilter : number;
		minProjecIdFilterEmpty : number;
    requestQueryFilter = '';
    requestBodyFilter = '';
    requestHeaderFilter = '';
    userAgentFilter = '';
    asnFilter = '';
    refererFilter = '';
    refererByRuleFilter = '';
    engineTypeFilter = '';
    engineTypeByRuleFilter = '';
    crawlerFilter = '';
    crawlerByRuleFilter = '';
    crawlerTypeFilter = '';
    crawlerTypeByRuleFilter = '';
    deviceNameFilter = '';
    deviceNameByRuleFilter = '';
    deviceTypeFilter = -1;
    deviceTypeByRuleFilter = -1;
    platformFilter = '';
    platformByRuleFilter = '';
    browserFilter = '';
    browserByRuleFilter = '';
    countryFilter = '';
    countryByRuleFilter = '';
    locationFilter = '';
    hostNameFilter = '';
    hostNameByRuleFilter = '';
    companyDomainFilter = '';
    companyDomainByRuleFilter = '';
    maxPageNrFilter : number;
		maxPageNrFilterEmpty : number;
		minPageNrFilter : number;
		minPageNrFilterEmpty : number;
    calledUrlFilter = '';
    callerIpFilter = '';
    callerIpByRuleFilter = '';
    companyNameFilter = '';
    companyNameByRuleFilter = '';
    companyTypeFilter = '';
    companyTypeByRuleFilter = '';
    regionFilter = '';
    regionByRuleFilter = '';
    asnByRuleFilter = '';
    asnCodeFilter = '';
    asnNameFilter = '';
    asnDomainFilter = '';
    asnTypeFilter = '';
    causeFilter = '';
    noteFilter = '';

    deviceType = RequestLogDtoDeviceType;
    deviceTypeByRule = RequestLogDtoDeviceType;



    constructor(
        injector: Injector,
        private _requestLogsServiceProxy: RequestLogsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getRequestLogs(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._requestLogsServiceProxy.getAll(
            this.filterText,
            this.maxProjecIdFilter == null ? this.maxProjecIdFilterEmpty: this.maxProjecIdFilter,
            this.minProjecIdFilter == null ? this.minProjecIdFilterEmpty: this.minProjecIdFilter,
            this.requestQueryFilter,
            this.requestBodyFilter,
            this.requestHeaderFilter,
            this.userAgentFilter,
            this.asnFilter,
            this.refererFilter,
            this.refererByRuleFilter,
            this.engineTypeFilter,
            this.engineTypeByRuleFilter,
            this.crawlerFilter,
            this.crawlerByRuleFilter,
            this.crawlerTypeFilter,
            this.crawlerTypeByRuleFilter,
            this.deviceNameFilter,
            this.deviceNameByRuleFilter,
            this.deviceTypeFilter,
            this.deviceTypeByRuleFilter,
            this.platformFilter,
            this.platformByRuleFilter,
            this.browserFilter,
            this.browserByRuleFilter,
            this.countryFilter,
            this.countryByRuleFilter,
            this.locationFilter,
            this.hostNameFilter,
            this.hostNameByRuleFilter,
            this.companyDomainFilter,
            this.companyDomainByRuleFilter,
            this.maxPageNrFilter == null ? this.maxPageNrFilterEmpty: this.maxPageNrFilter,
            this.minPageNrFilter == null ? this.minPageNrFilterEmpty: this.minPageNrFilter,
            this.calledUrlFilter,
            this.callerIpFilter,
            this.callerIpByRuleFilter,
            this.companyNameFilter,
            this.companyNameByRuleFilter,
            this.companyTypeFilter,
            this.companyTypeByRuleFilter,
            this.regionFilter,
            this.regionByRuleFilter,
            this.asnByRuleFilter,
            this.asnCodeFilter,
            this.asnNameFilter,
            this.asnDomainFilter,
            this.asnTypeFilter,
            this.causeFilter,
            this.noteFilter,
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

    createRequestLog(): void {
        this.createOrEditRequestLogModal.show();
    }

    deleteRequestLog(requestLog: RequestLogDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._requestLogsServiceProxy.delete(requestLog.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._requestLogsServiceProxy.getRequestLogsToExcel(
        this.filterText,
            this.maxProjecIdFilter == null ? this.maxProjecIdFilterEmpty: this.maxProjecIdFilter,
            this.minProjecIdFilter == null ? this.minProjecIdFilterEmpty: this.minProjecIdFilter,
            this.requestQueryFilter,
            this.requestBodyFilter,
            this.requestHeaderFilter,
            this.userAgentFilter,
            this.asnFilter,
            this.refererFilter,
            this.refererByRuleFilter,
            this.engineTypeFilter,
            this.engineTypeByRuleFilter,
            this.crawlerFilter,
            this.crawlerByRuleFilter,
            this.crawlerTypeFilter,
            this.crawlerTypeByRuleFilter,
            this.deviceNameFilter,
            this.deviceNameByRuleFilter,
            this.deviceTypeFilter,
            this.deviceTypeByRuleFilter,
            this.platformFilter,
            this.platformByRuleFilter,
            this.browserFilter,
            this.browserByRuleFilter,
            this.countryFilter,
            this.countryByRuleFilter,
            this.locationFilter,
            this.hostNameFilter,
            this.hostNameByRuleFilter,
            this.companyDomainFilter,
            this.companyDomainByRuleFilter,
            this.maxPageNrFilter == null ? this.maxPageNrFilterEmpty: this.maxPageNrFilter,
            this.minPageNrFilter == null ? this.minPageNrFilterEmpty: this.minPageNrFilter,
            this.calledUrlFilter,
            this.callerIpFilter,
            this.callerIpByRuleFilter,
            this.companyNameFilter,
            this.companyNameByRuleFilter,
            this.companyTypeFilter,
            this.companyTypeByRuleFilter,
            this.regionFilter,
            this.regionByRuleFilter,
            this.asnByRuleFilter,
            this.asnCodeFilter,
            this.asnNameFilter,
            this.asnDomainFilter,
            this.asnTypeFilter,
            this.causeFilter,
            this.noteFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
