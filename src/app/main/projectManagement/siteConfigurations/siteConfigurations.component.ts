import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { SiteConfigurationsServiceProxy, SiteConfigurationDto, SiteConfigurationDtoStatus, SiteConfigurationDtoDefaultLanguage } from '@shared/service-proxies/service-proxies';
import { ProjectsServiceProxy, ProjectDto} from '@shared/service-proxies/service-proxies';
//import { ProjectsServiceProxy, ProjectDto, IListResultDtoOfProjectListDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditSiteConfigurationModalComponent } from './create-or-edit-siteConfiguration-modal.component';
import { ViewSiteConfigurationModalComponent } from './view-siteConfiguration-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './siteConfigurations.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class SiteConfigurationsComponent extends AppComponentBase {

    @ViewChild('createOrEditSiteConfigurationModal') createOrEditSiteConfigurationModal: CreateOrEditSiteConfigurationModalComponent;
    @ViewChild('viewSiteConfigurationModalComponent') viewSiteConfigurationModal: ViewSiteConfigurationModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    project = -1;    

    siteStatus = SiteConfigurationDtoStatus;
    language = SiteConfigurationDtoDefaultLanguage;



    constructor(
        injector: Injector,
        private _siteConfigurationsServiceProxy: SiteConfigurationsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getSiteConfigurations(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._siteConfigurationsServiceProxy.getAll(
            this.filterText,
            this.project,
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

    createSiteConfiguration(): void {
        this.createOrEditSiteConfigurationModal.show();
    }

    deleteSiteConfiguration(siteConfiguration: SiteConfigurationDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._siteConfigurationsServiceProxy.delete(siteConfiguration.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        //this._siteConfigurationsServiceProxy.getSiteConfigurationsToExcel(
        //this.filterText,
        //    this.project,
        //    this.nameFilter,
        //    this.statusFilter,
        //    this.defaultLanguageFilter,
        //)
        //.subscribe(result => {
        //    this._fileDownloadService.downloadTempFile(result);
        // });
    }
}
