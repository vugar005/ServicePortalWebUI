import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { SiteTemplatesServiceProxy, SiteTemplateDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditSiteTemplateModalComponent } from './create-or-edit-siteTemplate-modal.component';
import { ViewSiteTemplateModalComponent } from './view-siteTemplate-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AppSessionService } from '../../../../shared/common/session/app-session.service';

@Component({
    templateUrl: './siteTemplates.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class SiteTemplatesComponent extends AppComponentBase {

    @ViewChild('createOrEditSiteTemplateModal') createOrEditSiteTemplateModal: CreateOrEditSiteTemplateModalComponent;
    @ViewChild('viewSiteTemplateModalComponent') viewSiteTemplateModal: ViewSiteTemplateModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    template = -1;
    descriptionFilter = '';
    notesFilter = '';




    constructor(
        injector: Injector,
        private _siteTemplatesServiceProxy: SiteTemplatesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _appSessionService: AppSessionService,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getSiteTemplates(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._siteTemplatesServiceProxy.getAll(
            this.filterText,
            this.template,
            this.descriptionFilter,
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

    createSiteTemplate(): void {
        this.createOrEditSiteTemplateModal.show();
    }

    cloneSiteTemplate(siteTemplate: SiteTemplateDto): void {
        const userId = this._appSessionService.userId;
        this._siteTemplatesServiceProxy.clone(siteTemplate, userId)
        .subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyCloned'));
        });
    }
    publishPage(siteTemplate: SiteTemplateDto): void {
        const userId = this._appSessionService.userId;
        this._siteTemplatesServiceProxy.publishPage(siteTemplate, userId)
        .subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyPublished'));
        });
    }
    publishField(siteTemplate: SiteTemplateDto): void {
        const userId = this._appSessionService.userId;
        this._siteTemplatesServiceProxy.publishPage(siteTemplate, userId)
        .subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyPublishedFIeld'));
        });
    }
    publisPageStructure(siteTemplate: SiteTemplateDto): void {
        const userId = this._appSessionService.userId;
        this._siteTemplatesServiceProxy.publishPage(siteTemplate, userId)
        .subscribe(() => {
            this.reloadPage();
            this.notify.success(this.l('SuccessfullyPublishedPageStructure'));
        });
    }


    deleteSiteTemplate(siteTemplate: SiteTemplateDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._siteTemplatesServiceProxy.delete(siteTemplate.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._siteTemplatesServiceProxy.getSiteTemplatesToExcel(
        this.filterText,
            this.template,
            this.descriptionFilter,
            this.notesFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
