import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent }   from '../student/student.component';
import { LandingComponent }      from '../landing/landing.component';
import { AdminComponent } from '../admin/admin.component'
import { TakesurveyComponent } from "../takesurvey/takesurvey.component"

import { StudentResolver } from "../resolvers/studentResolver"

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'student',  component: StudentComponent, resolve: { student: StudentResolver } },
  { path: 'landing',     component: LandingComponent },
	{ path: 'admin',     component: AdminComponent },
	{ path: 'student/takesurvey/:studentId',     component: TakesurveyComponent, resolve: { student: StudentResolver }	 }
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
