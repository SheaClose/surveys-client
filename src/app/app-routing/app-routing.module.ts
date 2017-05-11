import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from '../student/student.component';
import { LandingComponent } from '../landing/landing.component';
import { AdminComponent } from '../admin/admin.component';
import { TakesurveyComponent } from '../student/takesurvey/takesurvey.component';

import { CreateModifyTemplateComponent } from '../admin/create-modify-template/create-modify-template.component';
import { CreateTopicComponent } from '../admin/create-topic/create-topic.component';
import { SendSurveyComponent } from '../admin/send-survey/send-survey.component';
import { ViewBadgeRequestsComponent } from '../admin/view-badge-requests/view-badge-requests.component';
import { ViewResultsComponent } from '../admin/view-results/view-results.component';
import { CohortAdminComponent } from '../admin/cohort-admin/cohort-admin.component';
import { NoRoleComponent } from '../student/no-role/no-role.component';
import { CohortAnalyticsComponent } from '../admin/cohort-analytics/cohort-analytics.component';
import { StudentResolver } from '../resolvers/studentResolver';
import { AdminResolver } from '../resolvers/adminResolver';
import { CreateModifyTempResolver } from '../resolvers/createModifyTempResolver';
import { CreateTopicResolver } from '../resolvers/createTopicResolver';
import { SendSurveyResolver } from '../resolvers/sendSurveyResolver';
import { ViewResultsResolver } from '../resolvers/viewResultsResolver';

const routes: Routes = [
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  }, {
    path: 'student',
    resolve: { student: StudentResolver },
    children: [
      { path: '', component: StudentComponent },
      { path: 'takesurvey/:studentId', component: TakesurveyComponent }
    ]
  }, {
    path: 'landing', component: LandingComponent
  }, {
    path: 'admin',
    resolve: { student: AdminResolver },
    children: [
      { path: '', component: AdminComponent, },
      { path: 'createModifyTemplate', component: CreateModifyTemplateComponent, resolve: { templates: CreateModifyTempResolver } },
      { path: 'createTopic', component: CreateTopicComponent , resolve: { templates: CreateTopicResolver } },
      { path: 'sendSurvey', component: SendSurveyComponent, resolve: {
        topics: SendSurveyResolver,
        templates: CreateModifyTempResolver
      } },
      { path: 'viewResults', component: ViewResultsComponent, resolve: {
        surveys: ViewResultsResolver
      } },
      { path: 'cohortAdmin', component: CohortAdminComponent },
      {
        path: 'view_badge_requests', component: ViewBadgeRequestsComponent
      }, {
        path: 'cohortAnalytics', component: CohortAnalyticsComponent
      }
    ]
  }, {
    path: 'norole', component: NoRoleComponent
  }, {
    path: 'view_badge_requests', component: ViewBadgeRequestsComponent
  }, {
    path: 'cohortAnalytics', component: CohortAnalyticsComponent
  }, {
    path: '**', redirectTo: '/landing', pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
