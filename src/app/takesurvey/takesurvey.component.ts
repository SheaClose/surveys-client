import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
		private router: Router
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
						// NOTE: This is where you left off!!!
						// console.log(this.results)
        //     takeSurveyService.writeSurveyResults(this.results)
        //     .then(function(response) {
        //         console.log('in takeSurveyCtrl');
        //         console.log('in processForm');
        //         console.log('response', response);
        //         if (response.status === 200) {
        //             $state.go('student', {
        //                 toastMessage: 'Survey Successfully Submitted'
        //             });
        //         }
        //      })
        //     .catch(function(err) {
        //     // For any error, send them back to admin login screen.
        //         console.error('err = ', err);
        //         this.errorMsg = 'Error Submitting Survey';
        //     });
        }
        else {
        /*   alert('Need to answer all required questions shown in red');*/
            // $('#validation_modal').openModal();
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
