import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SiteTemplateDto, SiteTemplatesServiceProxy } from '@shared/service-proxies/service-proxies';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'templatecode-combo',
    template:
        `<select class="form-control" [formControl]="selectedTemplate">
        <option value = "-1" > {{ '' | localize }}</option>
        <option *ngFor="let template of templates" [value]="template.id">{{template.code}}</option>
    </select>`,
    
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TemplateComboComponent),
        multi: true,
    }]
})
export class TemplateComboComponent extends AppComponentBase implements OnInit, ControlValueAccessor {

    templates: SiteTemplateDto[] = [];
    selectedTemplate = new FormControl('');

    onTouched: any = () => { };

    constructor(
        private _templateService: SiteTemplatesServiceProxy,
        injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {

        this._templateService.getAllList().subscribe(result => {
            this.templates = result.items;
        });
    }

    writeValue(obj: any): void {
        if (this.selectedTemplate) {
            this.selectedTemplate.setValue(obj);
        }
    }

    registerOnChange(fn: any): void {
        this.selectedTemplate.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.selectedTemplate.disable();
        } else {
            this.selectedTemplate.enable();
        }
    }
}
