import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ContentFieldsServiceProxy, ContentFieldDto , ContentFieldDtoFieldType, ContentFieldDtoValueType, ContentFieldDtoLanguage, ContentFieldDtoContentType } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditContentFieldModalComponent } from './create-or-edit-contentField-modal.component';
import { ViewContentFieldModalComponent } from './view-contentField-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './contentFields.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class ContentFieldsComponent extends AppComponentBase {

    @ViewChild('createOrEditContentFieldModal') createOrEditContentFieldModal: CreateOrEditContentFieldModalComponent;
    @ViewChild('viewContentFieldModalComponent') viewContentFieldModal: ViewContentFieldModalComponent;
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxProjectIdFilter : number;
		maxProjectIdFilterEmpty : number;
		minProjectIdFilter : number;
		minProjectIdFilterEmpty : number;
    fieldTypeFilter = -1;
    valueTypeFilter = -1;
    languageFilter = -1;
    contentTypeFilter = -1;
    valueFilter = '';
    tagsFilter = '';

    fieldType = ContentFieldDtoFieldType;
    fieldValueType = ContentFieldDtoValueType;
    language = ContentFieldDtoLanguage;
    contentType = ContentFieldDtoContentType;



    constructor(
        injector: Injector,
        private _contentFieldsServiceProxy: ContentFieldsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getContentFields(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._contentFieldsServiceProxy.getAll(
            this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.fieldTypeFilter,
            this.valueTypeFilter,
            this.languageFilter,
            this.contentTypeFilter,
            this.valueFilter,
            this.tagsFilter,
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

    createContentField(): void {
        this.createOrEditContentFieldModal.show();
    }

    deleteContentField(contentField: ContentFieldDto): void {
        this.message.confirm(
            '',
            (isConfirmed) => {
                if (isConfirmed) {
                    this._contentFieldsServiceProxy.delete(contentField.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._contentFieldsServiceProxy.getContentFieldsToExcel(
        this.filterText,
            this.maxProjectIdFilter == null ? this.maxProjectIdFilterEmpty: this.maxProjectIdFilter,
            this.minProjectIdFilter == null ? this.minProjectIdFilterEmpty: this.minProjectIdFilter,
            this.fieldTypeFilter,
            this.valueTypeFilter,
            this.languageFilter,
            this.contentTypeFilter,
            this.valueFilter,
            this.tagsFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
