import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
import { AppRoutingModule }     from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { StudentComponent } from './student/student.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AdminComponent } from './admin/admin.component';
import { TakesurveyComponent } from './takesurvey/takesurvey.component'

import { StudentResolver } from "./resolvers/studentResolver"

import { AuthService } from "./auth-service.service";
import { NumericQuestionComponent } from './numeric-question/numeric-question.component';
import { BooleanQuestionComponent } from './boolean-question/boolean-question.component';
import { TextQuestionComponent } from './text-question/text-question.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';



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
    ModalExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		AppRoutingModule,
		MaterializeModule.forRoot()
  ],
  providers: [
		  StudentResolver
		, AuthService
	]
	, bootstrap: [AppComponent]
})
export class AppModule { }
