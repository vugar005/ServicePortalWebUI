import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { SitePageScriptsServiceProxy, SitePageScriptDto , SitePageScriptDtoPageName, SitePageScriptDtoPosition, SitePageScriptDtoContentType } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditSitePageScriptModalComponent } from './create-or-edit-sitePageScript-modal.component';
import { ViewSitePageScriptModalComponent } from './view-sitePageScript-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './sitePageScripts.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class SitePageScriptsComponent extends AppComponentBase {

    @ViewChild('createOrEditSitePageScriptModal') createOrEditSitePageScriptModal: CreateOrEditSitePageScriptModalComponent;
    @ViewChild('viewSitePageScriptModalComponent') viewSitePageScriptModal: ViewSitePageScriptModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    pageNameFilter = -1;
    maxNrFilter : number;
		maxNrFilterEmpty : number;
		minNrFilter : number;
		minNrFilterEmpty : number;
    positionFilter = -1;
    contentTypeFilter = -1;
    valueFilter = '';
    statusFilter = -1;

    sitePageNames = SitePageScriptDtoPageName;
    pageScriptPosition = SitePageScriptDtoPosition;
    contentType = SitePageScriptDtoContentType;



    constructor(
        injector: Injector,
        private _sitePageScriptsServiceProxy: SitePageScriptsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getSitePageScripts(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._sitePageScriptsServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.pageNameFilter,
            this.maxNrFilter == null ? this.maxNrFilterEmpty: this.maxNrFilter,
            this.minNrFilter == null ? this.minNrFilterEmpty: this.minNrFilter,
            this.positionFilter,
            this.contentTypeFilter,
            this.valueFilter,
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

    createSitePageScript(): void {
        this.createOrEditSitePageScriptModal.show();
    }

    deleteSitePageScript(sitePageScript: SitePageScriptDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._sitePageScriptsServiceProxy.delete(sitePageScript.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._sitePageScriptsServiceProxy.getSitePageScriptsToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.pageNameFilter,
            this.maxNrFilter == null ? this.maxNrFilterEmpty: this.maxNrFilter,
            this.minNrFilter == null ? this.minNrFilterEmpty: this.minNrFilter,
            this.positionFilter,
            this.contentTypeFilter,
            this.valueFilter,
            this.statusFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
