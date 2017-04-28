import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { StudentComponent } from './student/student.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AdminComponent } from './admin/admin.component';
import { TakesurveyComponent } from './student/takesurvey/takesurvey.component';

import { StudentResolver } from './resolvers/studentResolver';
import { AdminResolver } from './resolvers/adminResolver';
import { CreateModifyTempResolver } from './resolvers/createModifyTempResolver';

import { AuthService } from './auth-service.service';
import { NumericQuestionComponent } from './student/numeric-question/numeric-question.component';
import { BooleanQuestionComponent } from './student/boolean-question/boolean-question.component';
import { TextQuestionComponent } from './student/text-question/text-question.component';
import { CreateModifyTemplateComponent } from './admin/create-modify-template/create-modify-template.component';
import { CreateTopicComponent } from './admin/create-topic/create-topic.component';
import { SendSurveyComponent } from './admin/send-survey/send-survey.component';
import { ViewResultsComponent } from './admin/view-results/view-results.component';
import { CohortAdminComponent } from './admin/cohort-admin/cohort-admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { QuestionCrudComponent } from './admin/create-modify-template/question-crud/question-crud.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    StudentComponent,
    AdminComponent,
    TakesurveyComponent,
    NumericQuestionComponent,
    BooleanQuestionComponent,
    TextQuestionComponent,
    CreateModifyTemplateComponent,
    CreateTopicComponent,
    SendSurveyComponent,
    ViewResultsComponent,
    CohortAdminComponent,
    AdminHeaderComponent,
    QuestionCrudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    StudentResolver
    , AdminResolver
    , CreateModifyTempResolver
    , AuthService
  ]
  , bootstrap: [AppComponent]
})
export class AppModule { }
