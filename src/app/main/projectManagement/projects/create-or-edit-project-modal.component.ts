import { Component, ViewChild, Injector, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ProjectsServiceProxy, CreateOrEditProjectDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';


@Component({
    selector: 'createOrEditProjectModal',
    templateUrl: './create-or-edit-project-modal.component.html'
})
export class CreateOrEditProjectModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    project: CreateOrEditProjectDto = new CreateOrEditProjectDto();



    constructor(
        injector: Injector,
        private _projectsServiceProxy: ProjectsServiceProxy
    ) {
        super(injector);
    }

    show(projectId?: number): void {

        if (!projectId) {
            this.project = new CreateOrEditProjectDto();
            this.project.id = projectId;

            this.active = true;
            this.modal.show();
        } else {
            this._projectsServiceProxy.getProjectForEdit(projectId).subscribe(result => {
                this.project = result.project;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;

			
            this._projectsServiceProxy.createOrEdit(this.project)
             .pipe(finalize(() => { this.saving = false;}))
             .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
             });
    }







    close(): void {

        this.active = false;
        this.modal.hide();
    }
}
