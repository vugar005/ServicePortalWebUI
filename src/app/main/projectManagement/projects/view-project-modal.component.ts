import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GetProjectForViewDto, ProjectDto , ProjectDtoLanguages} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewProjectModal',
    templateUrl: './view-project-modal.component.html'
})
export class ViewProjectModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetProjectForViewDto;
    language = ProjectDtoLanguages;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetProjectForViewDto();
        this.item.project = new ProjectDto();
    }

    show(item: GetProjectForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
