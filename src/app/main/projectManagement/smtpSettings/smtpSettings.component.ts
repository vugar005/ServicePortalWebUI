import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { SmtpSettingsServiceProxy, SmtpSettingDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditSmtpSettingModalComponent } from './create-or-edit-smtpSetting-modal.component';
import { ViewSmtpSettingModalComponent } from './view-smtpSetting-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './smtpSettings.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class SmtpSettingsComponent extends AppComponentBase {

    @ViewChild('createOrEditSmtpSettingModal') createOrEditSmtpSettingModal: CreateOrEditSmtpSettingModalComponent;
    @ViewChild('viewSmtpSettingModalComponent') viewSmtpSettingModal: ViewSmtpSettingModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    hostFilter = '';
    maxPortFilter : number;
		maxPortFilterEmpty : number;
		minPortFilter : number;
		minPortFilterEmpty : number;
    enableSslFilter = -1;
    userNameFilter = '';
    passwordFilter = '';
    maxTimeoutFilter : number;
		maxTimeoutFilterEmpty : number;
		minTimeoutFilter : number;
		minTimeoutFilterEmpty : number;
    statusFilter = -1;




    constructor(
        injector: Injector,
        private _smtpSettingsServiceProxy: SmtpSettingsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getSmtpSettings(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._smtpSettingsServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.hostFilter,
            this.maxPortFilter == null ? this.maxPortFilterEmpty: this.maxPortFilter,
            this.minPortFilter == null ? this.minPortFilterEmpty: this.minPortFilter,
            this.enableSslFilter,
            this.userNameFilter,
            this.passwordFilter,
            this.maxTimeoutFilter == null ? this.maxTimeoutFilterEmpty: this.maxTimeoutFilter,
            this.minTimeoutFilter == null ? this.minTimeoutFilterEmpty: this.minTimeoutFilter,
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

    createSmtpSetting(): void {
        this.createOrEditSmtpSettingModal.show();
    }

    deleteSmtpSetting(smtpSetting: SmtpSettingDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._smtpSettingsServiceProxy.delete(smtpSetting.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._smtpSettingsServiceProxy.getSmtpSettingsToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.hostFilter,
            this.maxPortFilter == null ? this.maxPortFilterEmpty: this.maxPortFilter,
            this.minPortFilter == null ? this.minPortFilterEmpty: this.minPortFilter,
            this.enableSslFilter,
            this.userNameFilter,
            this.passwordFilter,
            this.maxTimeoutFilter == null ? this.maxTimeoutFilterEmpty: this.maxTimeoutFilter,
            this.minTimeoutFilter == null ? this.minTimeoutFilterEmpty: this.minTimeoutFilter,
            this.statusFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
