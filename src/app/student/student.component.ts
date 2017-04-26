import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TakeSurveyService } from "../take-survey-service.service"
import { AuthService } from "../auth-service.service"
import { MzToastService } from "ng2-materialize"
import * as _ from "lodash";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
	providers:[TakeSurveyService, AuthService, MzToastService]
})
export class StudentComponent implements OnInit {
	untakenSurveys: any[] = [];
	repeatableSurveys: any[] = [];
	optionalSurveys: any[] = [];
	isMentor: boolean = false;
	name: string = "";
	studentLogout(): void {
    this.authService.logout()
	    .subscribe((responseStatus)=>{
				(responseStatus === 200) ? this.router.navigate(['/landing']) : null;
		})
  };
  constructor(
		private route: ActivatedRoute,
		private takeSurveyService: TakeSurveyService,
		private authService: AuthService,
		private router: Router,
		private mzToast: MzToastService
	) {};


	showToast() {
	  this.mzToast.show('Survey Successfully Submitted', 4000, 'blue');
	}

  ngOnInit() {
		const {submitted} = this.route.snapshot.queryParams
		const {student} = this.route.snapshot.data;

		submitted ? this.showToast() : null;

		this.takeSurveyService.getUntaken(student._id).subscribe((surveyArray)=>{
			surveyArray.forEach((e)=>{
				if (e.repeatable && e.usersTaken.indexOf(student._id)>-1){
					this.repeatableSurveys.push(e);
				}else if (e.optional){
					this.optionalSurveys.push(e);
				}else{
					this.untakenSurveys.push(e);
				}
			})
		})
		this.name = student.name.first + " " + student.name.last;

		this.isMentor = (_.findIndex(student.roles, (o) => o["role"] == 'mentor')) !== -1
  }

}
