import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from "../Survey";
import * as _ from "lodash";
import { TakeSurveyService } from "../take-survey-service.service"

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
	providers:[TakeSurveyService]
})
export class StudentComponent implements OnInit {
	untakenSurveys: any[] = [];
	repeatableSurveys: any[] = [];
	optionalSurveys: any[] = [];
	isMentor: boolean = false;
	name: string = "";
	studentLogout(): void {
		this.isMentor = !this.isMentor
	}
  constructor(
			private route: ActivatedRoute
		, private takeSurveyService: TakeSurveyService
	) {
	}

  ngOnInit() {
		const {student} = this.route.snapshot.data;
		const self = this
		this.takeSurveyService.getUntaken(student._id).subscribe((res)=>{
			res.forEach(function(e){
				if (e.repeatable && e.usersTaken.indexOf(student._id)>-1){
					self.repeatableSurveys.push(e);
				}else if (e.optional){
					self.optionalSurveys.push(e);
				}else{
					self.untakenSurveys.push(e);
				}
			})
		})
		this.name = student.name.first + " " + student.name.last;

		//check if current student is a mentor
		this.isMentor = (_.findIndex(student.roles, (o) => o["role"] == 'mentor')) !== -1
  }

}
