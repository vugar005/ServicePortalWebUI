import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { SitePageScriptsComponent } from './contentManagement/sitePageScripts/sitePageScripts.component';
import { ViewSitePageScriptModalComponent } from './contentManagement/sitePageScripts/view-sitePageScript-modal.component';
import { CreateOrEditSitePageScriptModalComponent } from './contentManagement/sitePageScripts/create-or-edit-sitePageScript-modal.component';

import { TemplatePageContentsComponent } from './templateManagement/templatePageContents/templatePageContents.component';
import { ViewTemplatePageContentModalComponent } from './templateManagement/templatePageContents/view-templatePageContent-modal.component';
import { CreateOrEditTemplatePageContentModalComponent } from './templateManagement/templatePageContents/create-or-edit-templatePageContent-modal.component';

import { TemplatePagesComponent } from './templateManagement/templatePages/templatePages.component';
import { ViewTemplatePageModalComponent } from './templateManagement/templatePages/view-templatePage-modal.component';
import { CreateOrEditTemplatePageModalComponent } from './templateManagement/templatePages/create-or-edit-templatePage-modal.component';

import { TemplateFieldsComponent } from './templateManagement/templateFields/templateFields.component';
import { ViewTemplateFieldModalComponent } from './templateManagement/templateFields/view-templateField-modal.component';
import { CreateOrEditTemplateFieldModalComponent } from './templateManagement/templateFields/create-or-edit-templateField-modal.component';

import { SiteTemplatesComponent } from './templateManagement/siteTemplates/siteTemplates.component';
import { ViewSiteTemplateModalComponent } from './templateManagement/siteTemplates/view-siteTemplate-modal.component';
import { CreateOrEditSiteTemplateModalComponent } from './templateManagement/siteTemplates/create-or-edit-siteTemplate-modal.component';

import { SmtpSettingsComponent } from './projectManagement/smtpSettings/smtpSettings.component';
import { ViewSmtpSettingModalComponent } from './projectManagement/smtpSettings/view-smtpSetting-modal.component';
import { CreateOrEditSmtpSettingModalComponent } from './projectManagement/smtpSettings/create-or-edit-smtpSetting-modal.component';

import { SchedulesComponent } from './projectManagement/schedules/schedules.component';
import { ViewScheduleModalComponent } from './projectManagement/schedules/view-schedule-modal.component';
import { CreateOrEditScheduleModalComponent } from './projectManagement/schedules/create-or-edit-schedule-modal.component';

import { ServiceEndpointsesComponent } from './projectManagement/serviceEndpointses/serviceEndpointses.component';
import { ViewServiceEndpointsModalComponent } from './projectManagement/serviceEndpointses/view-serviceEndpoints-modal.component';
import { CreateOrEditServiceEndpointsModalComponent } from './projectManagement/serviceEndpointses/create-or-edit-serviceEndpoints-modal.component';

import { RequestLogsComponent } from './logs/requestLogs/requestLogs.component';
import { ViewRequestLogModalComponent } from './logs/requestLogs/view-requestLog-modal.component';
import { CreateOrEditRequestLogModalComponent } from './logs/requestLogs/create-or-edit-requestLog-modal.component';

import { RulesComponent } from './ruleManagement/rules/rules.component';
import { ViewRuleModalComponent } from './ruleManagement/rules/view-rule-modal.component';
import { CreateOrEditRuleModalComponent } from './ruleManagement/rules/create-or-edit-rule-modal.component';

import { CheckObjectsComponent } from './ruleManagement/checkObjects/checkObjects.component';
import { ViewCheckObjectModalComponent } from './ruleManagement/checkObjects/view-checkObject-modal.component';
import { CreateOrEditCheckObjectModalComponent } from './ruleManagement/checkObjects/create-or-edit-checkObject-modal.component';

import { SitePagesComponent } from './contentManagement/sitePages/sitePages.component';
import { ViewSitePageModalComponent } from './contentManagement/sitePages/view-sitePage-modal.component';
import { CreateOrEditSitePageModalComponent } from './contentManagement/sitePages/create-or-edit-sitePage-modal.component';

import { ContentFieldsComponent } from './contentManagement/contentFields/contentFields.component';
import { ViewContentFieldModalComponent } from './contentManagement/contentFields/view-contentField-modal.component';
import { CreateOrEditContentFieldModalComponent } from './contentManagement/contentFields/create-or-edit-contentField-modal.component';

import { SiteConfigurationsComponent } from './projectManagement/siteConfigurations/siteConfigurations.component';
import { ViewSiteConfigurationModalComponent } from './projectManagement/siteConfigurations/view-siteConfiguration-modal.component';
import { CreateOrEditSiteConfigurationModalComponent } from './projectManagement/siteConfigurations/create-or-edit-siteConfiguration-modal.component';

import { ProjectsComponent } from './projectManagement/projects/projects.component';
import { ViewProjectModalComponent } from './projectManagement/projects/view-project-modal.component';
import { CreateOrEditProjectModalComponent } from './projectManagement/projects/create-or-edit-project-modal.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';import { FileUploadModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule, TabsModule, TooltipModule, BsDropdownModule } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BsDatepickerModule, BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';

import { ProjectComboComponent } from './shared/projectcode-combo.component';
import { TemplateComboComponent } from './shared/templatecode-combo.component';
import {InputTextareaModule} from 'primeng/inputtextarea';

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    imports: [
		FileUploadModule,
		AutoCompleteModule,
		PaginatorModule,
		EditorModule,
        InputMaskModule,
		TableModule,
		InputTextareaModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        NgxChartsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    declarations: [
		SitePageScriptsComponent,
		ViewSitePageScriptModalComponent,		CreateOrEditSitePageScriptModalComponent,
		TemplatePageContentsComponent,
		ViewTemplatePageContentModalComponent,		CreateOrEditTemplatePageContentModalComponent,
		TemplatePagesComponent,
		ViewTemplatePageModalComponent,		CreateOrEditTemplatePageModalComponent,
		TemplateFieldsComponent,
		ViewTemplateFieldModalComponent,		CreateOrEditTemplateFieldModalComponent,
		SiteTemplatesComponent,
		ViewSiteTemplateModalComponent,		CreateOrEditSiteTemplateModalComponent,
		SmtpSettingsComponent,
		ViewSmtpSettingModalComponent,		CreateOrEditSmtpSettingModalComponent,
		SchedulesComponent,
		ViewScheduleModalComponent,		CreateOrEditScheduleModalComponent,
		ServiceEndpointsesComponent,
		ViewServiceEndpointsModalComponent,		CreateOrEditServiceEndpointsModalComponent,
		RequestLogsComponent,
		ViewRequestLogModalComponent,		CreateOrEditRequestLogModalComponent,
		RulesComponent,
		ViewRuleModalComponent,		CreateOrEditRuleModalComponent,
		CheckObjectsComponent,
		ViewCheckObjectModalComponent,		CreateOrEditCheckObjectModalComponent,
		SitePagesComponent,
		ViewSitePageModalComponent,		CreateOrEditSitePageModalComponent,
		ContentFieldsComponent,
		ViewContentFieldModalComponent,		CreateOrEditContentFieldModalComponent,
		SiteConfigurationsComponent,
		ViewSiteConfigurationModalComponent,		CreateOrEditSiteConfigurationModalComponent,
        ProjectsComponent,
		ViewProjectModalComponent,		CreateOrEditProjectModalComponent,
        DashboardComponent,
        ProjectComboComponent,
        TemplateComboComponent
    ],
    providers: [
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale }
    ]
})
export class MainModule { }
