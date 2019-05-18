import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ServiceEndpointsesServiceProxy, ServiceEndpointsDto , ServiceEndpointsDtoServiceEntity } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditServiceEndpointsModalComponent } from './create-or-edit-serviceEndpoints-modal.component';
import { ViewServiceEndpointsModalComponent } from './view-serviceEndpoints-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './serviceEndpointses.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class ServiceEndpointsesComponent extends AppComponentBase {

    @ViewChild('createOrEditServiceEndpointsModal') createOrEditServiceEndpointsModal: CreateOrEditServiceEndpointsModalComponent;
    @ViewChild('viewServiceEndpointsModalComponent') viewServiceEndpointsModal: ViewServiceEndpointsModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    serviceEntityFilter = -1;
    endpointUrlFilter = '';
    notesFilter = '';

    projectEntity = ServiceEndpointsDtoServiceEntity;



    constructor(
        injector: Injector,
        private _serviceEndpointsesServiceProxy: ServiceEndpointsesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getServiceEndpointses(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._serviceEndpointsesServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.serviceEntityFilter,
            this.endpointUrlFilter,
            this.notesFilter,
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

    createServiceEndpoints(): void {
        this.createOrEditServiceEndpointsModal.show();
    }

    deleteServiceEndpoints(serviceEndpoints: ServiceEndpointsDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._serviceEndpointsesServiceProxy.delete(serviceEndpoints.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._serviceEndpointsesServiceProxy.getServiceEndpointsesToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.serviceEntityFilter,
            this.endpointUrlFilter,
            this.notesFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
