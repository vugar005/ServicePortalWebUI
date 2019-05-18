import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { SitePagesServiceProxy, SitePageDto , SitePageDtoType, SitePageDtoLanguage1, SitePageDtoContentType1, SitePageDtoLanguage2, SitePageDtoContentType2, SitePageDtoLanguage3, SitePageDtoContentType3 } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditSitePageModalComponent } from './create-or-edit-sitePage-modal.component';
import { ViewSitePageModalComponent } from './view-sitePage-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './sitePages.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class SitePagesComponent extends AppComponentBase {

    @ViewChild('createOrEditSitePageModal') createOrEditSitePageModal: CreateOrEditSitePageModalComponent;
    @ViewChild('viewSitePageModalComponent') viewSitePageModal: ViewSitePageModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    maxNrFilter : number;
		maxNrFilterEmpty : number;
		minNrFilter : number;
		minNrFilterEmpty : number;
    descriptionFilter = '';
    language1Filter = -1;
    contentType1Filter = -1;
    language2Filter = -1;
    contentType2Filter = -1;
    language3Filter = -1;
    contentType3Filter = -1;

    pageType = SitePageDtoType;
    language = SitePageDtoLanguage1;
    contentType = SitePageDtoContentType1;
    language2 = SitePageDtoLanguage2;
    contentType2 = SitePageDtoContentType2;
    language3 = SitePageDtoLanguage3;
    contentType3 = SitePageDtoContentType3;



    constructor(
        injector: Injector,
        private _sitePagesServiceProxy: SitePagesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getSitePages(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._sitePagesServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.maxNrFilter == null ? this.maxNrFilterEmpty: this.maxNrFilter,
            this.minNrFilter == null ? this.minNrFilterEmpty: this.minNrFilter,
            this.descriptionFilter,
            this.language1Filter,
            this.contentType1Filter,
            this.language2Filter,
            this.contentType2Filter,
            this.language3Filter,
            this.contentType3Filter,
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

    createSitePage(): void {
        this.createOrEditSitePageModal.show();
    }

    deleteSitePage(sitePage: SitePageDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._sitePagesServiceProxy.delete(sitePage.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._sitePagesServiceProxy.getSitePagesToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.maxNrFilter == null ? this.maxNrFilterEmpty: this.maxNrFilter,
            this.minNrFilter == null ? this.minNrFilterEmpty: this.minNrFilter,
            this.descriptionFilter,
            this.language1Filter,
            this.contentType1Filter,
            this.language2Filter,
            this.contentType2Filter,
            this.language3Filter,
            this.contentType3Filter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
