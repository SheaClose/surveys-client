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



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    StudentComponent,
    AdminComponent,
    TakesurveyComponent
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
