import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateSurveyService } from "../templateSurveyService"
import 										 'rxjs/add/operator/catch';

@Component({
  selector: 'app-create-modify-template',
  templateUrl: './create-modify-template.component.html',
  styleUrls: ['./create-modify-template.component.css'],
	providers: [ TemplateSurveyService ]
})

export class CreateModifyTemplateComponent implements OnInit {
	errorMsg: string = "";
	templates: Array<any>;
	template: any = {
		questions: []
	};
	quest_types: string[] = ['numeric', 'boolean', 'text'];
	questionIndex: number = 0;
	selectedTemplateName: string;

  constructor(
		overlay: Overlay,
		vcRef: ViewContainerRef,
		public modal: Modal,
		private route: ActivatedRoute,
		private templateSurveyService: TemplateSurveyService,
		private router: Router
	) {overlay.defaultViewContainer = vcRef; }

	ngOnInit() {
		const { value }: any = this.route.data
		this.templates = value.templates.json()
  }

	loadSelectedTemplate(templ){
		this.templateSurveyService
			.getTemplate( templ._id )
			.subscribe( res => {

				this.template = res
				this.selectedTemplateName = res.name
			} )
	}

	updateExistingTemplate(){
		this.templateSurveyService
			.updateTemplate(this.template._id, this.template)
			.subscribe((res):void => {
				if (res.errors) {
				  this.errorMsg = 'Error in Creating Template';
				}
				else{
					this.router.navigate(['/admin'], { queryParams: { toastMessage: 'Template Successfully Updated' } })
				}
			})
	}

	preSubmit() {
 		this.modal.confirm()
      .size('lg')
			.keyboard(27)
			.bodyClass("margin_top")
			.okBtnClass("green_background modal-action modal-close waves-effect waves-green btn-flat")
			.cancelBtnClass("red_background modal-action modal-close waves-effect waves-green btn-flat")
      .body(`
				<div>
					<div>
						<p>Confirm to overwrite existing template. If you want to create a new template, hit 'Cancel' and change template name before saving.</p>
					</div>
				</div>`)
      .open()
			.then(res=>{
				res.result.then(ok=>{
						this.updateExistingTemplate()
					})
					.catch(cancel=>console.log("cancel"))
			})
  }
	deleteQuestion(idx):void{
		this.template.questions.splice(idx, 1);
	}
	writeNewTemplate(){
		this.templateSurveyService
			.writeNewTemplate(this.template)
			.subscribe((response) => {
				if (response.errors) {
					this.errorMsg = 'Error in Creating Template';
				}
				if (response._id) {
					this.router.navigate(['/admin'], { queryParams: { toastMessage: 'Template Successfully Created' } })
				}
			})
	}

	requiredFieldsComplete():boolean {
		return ( this.template.description && this.template.name && this.template.questions.length )
	}

	processForm(){
		if ( this.requiredFieldsComplete() ) {
			if ( this.selectedTemplateName === this.template.name ) { // if haven't changed name
				return this.preSubmit()
			}
			if ( this.template._id ) {
				delete this.template._id;
			}
				this.writeNewTemplate()
		}
		else {
			this.errorMsg = "Error in Creating Template. Ensure Template Name, Description, and Questions are all completed."
			setTimeout( ()=>{ this.errorMsg = "" }, 4000 )
		}
	}
	addNewQuestion(){
		this.template.questions.push({
      "questionText" :  "",
      "type" : "",
      "required" : false
    });
	}
}
