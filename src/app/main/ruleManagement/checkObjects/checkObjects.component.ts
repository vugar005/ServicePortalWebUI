import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { CheckObjectsServiceProxy, CheckObjectDto , CheckObjectDtoSource, CheckObjectDtoCheckType } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCheckObjectModalComponent } from './create-or-edit-checkObject-modal.component';
import { ViewCheckObjectModalComponent } from './view-checkObject-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './checkObjects.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CheckObjectsComponent extends AppComponentBase {

    @ViewChild('createOrEditCheckObjectModal') createOrEditCheckObjectModal: CreateOrEditCheckObjectModalComponent;
    @ViewChild('viewCheckObjectModalComponent') viewCheckObjectModal: ViewCheckObjectModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    nameFilter = '';
    sourceFilter = -1;
    checkTypeFilter = -1;

    checkObjectSource = CheckObjectDtoSource;
    checkType = CheckObjectDtoCheckType;



    constructor(
        injector: Injector,
        private _checkObjectsServiceProxy: CheckObjectsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCheckObjects(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._checkObjectsServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.nameFilter,
            this.sourceFilter,
            this.checkTypeFilter,
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

    createCheckObject(): void {
        this.createOrEditCheckObjectModal.show();
    }

    deleteCheckObject(checkObject: CheckObjectDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._checkObjectsServiceProxy.delete(checkObject.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._checkObjectsServiceProxy.getCheckObjectsToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.nameFilter,
            this.sourceFilter,
            this.checkTypeFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
