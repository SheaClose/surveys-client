import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { MzToastService } from "ng2-materialize"

import { TakeSurveyService } from "../take-survey-service.service"
import { AuthService } from "../auth-service.service"

@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrls: ['./takesurvey.component.css'],
	providers:[TakeSurveyService, AuthService]
})

export class TakesurveyComponent implements OnInit {
	params: string = "";
	results: any = {};
	response: any = {};
	notAnswered: any[] = [];
	borderOnYes: any[] = [];
	borderOnNo: any[] = [];
	survey: any = {};
	topic: string = "";
	topicId: string = "";
	student: any = {};

  constructor(
		private route: ActivatedRoute,
		private takeSurveyService: TakeSurveyService,
		private authService: AuthService,
		private router: Router,
		private mzToast: MzToastService
	) { }

  ngOnInit() {
		const { student } = this.route.snapshot.data;
		this.student = student;
		this.route.params.subscribe(params => {
			this.takeSurveyService.getSurvey(params["studentId"]).subscribe(res=> {
				this.params = res._id
				this.survey = res
				this.initializeResults()
				this.readTopic()
			})
		})
  }

	errorToast() {
	  this.mzToast.show('Error Submitting Survey', 4500, 'red');
		this.mzToast.show("<p style='color:red;'>Validation Error: <br>Please answer all required questions shown in red</p>", 4500);
	}

	initializeResults(){
		this.results.answers = []
		this.survey.questions.forEach((question, index, array) => {
      this.results.answers[index] = {
          type: question.type
      };
      this.notAnswered[index] = false;
      this.borderOnYes[index] = false;
      this.borderOnNo[index] = false;
    });
	}

	readTopic(){
		this.takeSurveyService.getTopic(this.survey.topic).subscribe(res=>{
			this.topic = res.name;
      this.topicId = res._id;
		})
	}

	processForm( ){
        if (this.checkForRequired()) {
          this.results.user = this.student._id;
          this.results.survey = this.params
          this.results.topic = this.topicId;
          this.takeSurveyService
						.writeSurveyResults(this.results)
						.subscribe( status => {
	                if (status === 200) {
										this.router.navigate(['/student'], { queryParams: { submitted: true } })
	                }
						})
        }
        else {
        	this.errorToast()
        }
    }
	checkForRequired(){
       var allRequiredFieldsAnswered = true;
       for (var i = 0; i < this.survey.questions.length; i++) {
           if (this.survey.questions[i].required) {
                switch (this.results.answers[i].type) {
                    case 'numeric':
                        if (!this.results.answers[i].numericAnswer) {
                            console.log('numeric not answered');
                            this.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        }
                        else {
                            this.notAnswered[i] = false;
                        }
                        break;
                    case 'boolean':
                        if (!this.results.answers[i].booleanAnswerCompleted) {
                            console.log('boolean not answered');
                            this.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        }
                        else {
                            this.notAnswered[i] = false;
                        }
                        break;
                    case 'text':
                        if (!this.results.answers[i].textAnswer) {
                            console.log('text not answered');
                            this.notAnswered[i] = true;
                            allRequiredFieldsAnswered = false;
                        }
                        else {
                            this.notAnswered[i] = false;
                        }
                        break;
                }
            }

       }

       return allRequiredFieldsAnswered;

    }
	studentLogout(){
		this.authService.logout().subscribe(res=>{
			if (res === 200) {
        this.router.navigate(['/landing'])
    	}
		})
	}
}
