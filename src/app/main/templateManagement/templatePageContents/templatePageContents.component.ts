import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { TemplatePageContentsServiceProxy, TemplatePageContentDto, TemplatePageContentDtoPageName, TemplatePageContentDtoPagePart, TemplatePageContentDtoContentType } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTemplatePageContentModalComponent } from './create-or-edit-templatePageContent-modal.component';
import { ViewTemplatePageContentModalComponent } from './view-templatePageContent-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './templatePageContents.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TemplatePageContentsComponent extends AppComponentBase {

    @ViewChild('createOrEditTemplatePageContentModal') createOrEditTemplatePageContentModal: CreateOrEditTemplatePageContentModalComponent;
    @ViewChild('viewTemplatePageContentModalComponent') viewTemplatePageContentModal: ViewTemplatePageContentModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    template: -1;
    pageNameFilter = -1;
    pagePartFilter = 0;
    contentTypeFilter = -1;
    statusFilter = -1;

    sitePageNames = TemplatePageContentDtoPageName;
    pagePart = TemplatePageContentDtoPagePart;
    contentType = TemplatePageContentDtoContentType;

    constructor(
        injector: Injector,
        private _templatePageContentsServiceProxy: TemplatePageContentsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getTemplatePageContents(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._templatePageContentsServiceProxy.getAll(
            this.filterText,
            this.template,
            this.pageNameFilter,
            this.pagePartFilter,
            this.contentTypeFilter,
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

    createTemplatePageContent(): void {
        this.createOrEditTemplatePageContentModal.show();
    }

    deleteTemplatePageContent(templatePageContent: TemplatePageContentDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._templatePageContentsServiceProxy.delete(templatePageContent.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._templatePageContentsServiceProxy.getTemplatePageContentsToExcel(
        this.filterText,
            this.template,
            this.pageNameFilter,
            this.pagePartFilter,
            this.contentTypeFilter,
            this.statusFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
