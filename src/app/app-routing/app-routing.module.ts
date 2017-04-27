import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent }   from '../student/student.component';
import { LandingComponent }  from '../landing/landing.component';
import { AdminComponent } from '../admin/admin.component';
import { TakesurveyComponent } from "../student/takesurvey/takesurvey.component";

import { CreateModifyTemplateComponent } from "../admin/create-modify-template/create-modify-template.component";
import { CreateTopicComponent } from "../admin/create-topic/create-topic.component";
import { SendSurveyComponent } from "../admin/send-survey/send-survey.component";
import { ViewResultsComponent } from "../admin/view-results/view-results.component";
import { CohortAdminComponent } from "../admin/cohort-admin/cohort-admin.component";

import { StudentResolver } from "../resolvers/studentResolver";
import { AdminResolver } from "../resolvers/adminResolver";
import { CreateModifyTempResolver } from "../resolvers/createModifyTempResolver";

const routes: Routes = [
	{
		path: '', redirectTo: '/landing', pathMatch: 'full'
	}, {
		path: 'student',
		resolve: { student: StudentResolver },
		children: [
			{ path: '', component: StudentComponent},
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
			{ path: 'createTopic', component: CreateTopicComponent },
			{ path: 'sendSurvey', component: SendSurveyComponent },
			{ path: 'viewResults', component: ViewResultsComponent },
			{ path: 'cohortAdmin', component: CohortAdminComponent }
		]
	}, {
		path: '**', redirectTo: '/landing', pathMatch: 'full'
	}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
