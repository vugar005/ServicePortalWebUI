import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { SchedulesServiceProxy, ScheduleDto , ScheduleDtoSiteStatus } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditScheduleModalComponent } from './create-or-edit-schedule-modal.component';
import { ViewScheduleModalComponent } from './view-schedule-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './schedules.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class SchedulesComponent extends AppComponentBase {

    @ViewChild('createOrEditScheduleModal') createOrEditScheduleModal: CreateOrEditScheduleModalComponent;
    @ViewChild('viewScheduleModalComponent') viewScheduleModal: ViewScheduleModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    maxStartDateFilter : moment.Moment;
		minStartDateFilter : moment.Moment;
    endDateFilter = '';
    siteStatusFilter = -1;
    isForcedFilter = -1;
    maxPriorityFilter : string = '';
		minPriorityFilter : string = '';

    siteStatus = ScheduleDtoSiteStatus;



    constructor(
        injector: Injector,
        private _schedulesServiceProxy: SchedulesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getSchedules(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._schedulesServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.maxStartDateFilter,
            this.minStartDateFilter,
            this.endDateFilter,
            this.siteStatusFilter,
            this.isForcedFilter,
			this.maxPriorityFilter == null ? 0 : 1,
			this.minPriorityFilter == null ? 0 : 1,
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

    createSchedule(): void {
        this.createOrEditScheduleModal.show();
    }

    deleteSchedule(schedule: ScheduleDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._schedulesServiceProxy.delete(schedule.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._schedulesServiceProxy.getSchedulesToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.maxStartDateFilter,
            this.minStartDateFilter,
            this.endDateFilter,
            this.siteStatusFilter,
            this.isForcedFilter,
			this.maxPriorityFilter == null ? 0 : 1,
			this.minPriorityFilter == null ? 0 : 1,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
