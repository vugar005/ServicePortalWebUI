import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ProjectsServiceProxy, ProjectDto , ProjectDtoLanguages } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditProjectModalComponent } from './create-or-edit-project-modal.component';
import { ViewProjectModalComponent } from './view-project-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './projects.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class ProjectsComponent extends AppComponentBase {

    @ViewChild('createOrEditProjectModal') createOrEditProjectModal: CreateOrEditProjectModalComponent;
    @ViewChild('viewProjectModalComponent') viewProjectModal: ViewProjectModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    project = -1;
    descriptionFilter = '';
    tagsFilter = '';
    countryFilter = '-1';
    templateFilter = '';
    statusFilter = -1;
    languagesFilter = -1;

    language = ProjectDtoLanguages;



    constructor(
        injector: Injector,
        private _projectsServiceProxy: ProjectsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getProjects(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._projectsServiceProxy.getAll(
            this.filterText,
            this.project,
            this.descriptionFilter,
            this.tagsFilter,
            this.countryFilter,
            this.statusFilter,
            this.languagesFilter,
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

    createProject(): void {
        this.createOrEditProjectModal.show();
    }

    deleteProject(project: ProjectDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._projectsServiceProxy.delete(project.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._projectsServiceProxy.getProjectsToExcel(
        this.filterText,
            this.project,
            this.descriptionFilter,
            this.tagsFilter,
            this.countryFilter,
            this.templateFilter,
            this.statusFilter,
            this.languagesFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
