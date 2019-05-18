import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SitePageScriptsComponent } from './contentManagement/sitePageScripts/sitePageScripts.component';
import { TemplatePageContentsComponent } from './templateManagement/templatePageContents/templatePageContents.component';
import { TemplatePagesComponent } from './templateManagement/templatePages/templatePages.component';
import { TemplateFieldsComponent } from './templateManagement/templateFields/templateFields.component';
import { SiteTemplatesComponent } from './templateManagement/siteTemplates/siteTemplates.component';
import { SmtpSettingsComponent } from './projectManagement/smtpSettings/smtpSettings.component';
import { SchedulesComponent } from './projectManagement/schedules/schedules.component';
import { ServiceEndpointsesComponent } from './projectManagement/serviceEndpointses/serviceEndpointses.component';
import { RequestLogsComponent } from './logs/requestLogs/requestLogs.component';
import { RulesComponent } from './ruleManagement/rules/rules.component';
import { CheckObjectsComponent } from './ruleManagement/checkObjects/checkObjects.component';
import { SitePagesComponent } from './contentManagement/sitePages/sitePages.component';
import { ContentFieldsComponent } from './contentManagement/contentFields/contentFields.component';
import { SiteConfigurationsComponent } from './projectManagement/siteConfigurations/siteConfigurations.component';
import { ProjectsComponent } from './projectManagement/projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'contentManagement/sitePageScripts', component: SitePageScriptsComponent, data: { permission: 'Pages.SitePageScripts' }  },
                    { path: 'templateManagement/templatePageContents', component: TemplatePageContentsComponent, data: { permission: 'Pages.TemplatePageContents' }  },
                    { path: 'templateManagement/templatePages', component: TemplatePagesComponent, data: { permission: 'Pages.TemplatePages' }  },
                    { path: 'templateManagement/templateFields', component: TemplateFieldsComponent, data: { permission: 'Pages.TemplateFields' }  },
                    { path: 'templateManagement/siteTemplates', component: SiteTemplatesComponent, data: { permission: 'Pages.SiteTemplates' }  },
                    // { path: 'projectManagement/smtpSettings', component: SmtpSettingsComponent, data: { permission: 'Pages.SmtpSettings' }  },
                    // { path: 'projectManagement/schedules', component: SchedulesComponent, data: { permission: 'Pages.Schedules' }  },
                    // { path: 'projectManagement/serviceEndpointses', component: ServiceEndpointsesComponent, data: { permission: 'Pages.ServiceEndpointses' }  },
                    // { path: 'logs/requestLogs', component: RequestLogsComponent, data: { permission: 'Pages.RequestLogs' }  },
                    // { path: 'ruleManagement/rules', component: RulesComponent, data: { permission: 'Pages.Rules' }  },
                    // { path: 'ruleManagement/checkObjects', component: CheckObjectsComponent, data: { permission: 'Pages.CheckObjects' }  },
                    // { path: 'contentManagement/sitePages', component: SitePagesComponent, data: { permission: 'Pages.SitePages' }  },
                    // { path: 'contentManagement/contentFields', component: ContentFieldsComponent, data: { permission: 'Pages.ContentFields' }  },
                    // { path: 'projectManagement/siteConfigurations', component: SiteConfigurationsComponent, data: { permission: 'Pages.SiteConfigurations' }  },
                    // { path: 'projectManagement/projects', component: ProjectsComponent, data: { permission: 'Pages.Projects' }  },
                   { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
