import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProjectDto, ProjectsServiceProxy } from '@shared/service-proxies/service-proxies';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'projectcode-combo',
    template:
        `<select class="form-control" [formControl]="selectedProject">
        <option value = "-1" > {{ '' | localize }}</option>
        <option *ngFor="let project of projects" [value]="project.id">{{project.code}}</option>
    </select>`,
    
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ProjectComboComponent),
        multi: true,
    }]
})
export class ProjectComboComponent extends AppComponentBase implements OnInit, ControlValueAccessor {

    projects: ProjectDto[] = [];
    selectedProject = new FormControl('');

    onTouched: any = () => { };

    constructor(
        private _projectService: ProjectsServiceProxy,
        injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {

        this._projectService.getAllList().subscribe(result => {
            this.projects = result.items;
        });
    }

    writeValue(obj: any): void {
        if (this.selectedProject) {
            this.selectedProject.setValue(obj);
        }
    }

    registerOnChange(fn: any): void {
        this.selectedProject.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.selectedProject.disable();
        } else {
            this.selectedProject.enable();
        }
    }
}
