import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-crud',
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent {

	@Input() public question: any;
	@Input() public questionTypes: any;
	@Input() public questions: any;
	@Input() public questionIndex: any;
	@Output() public questionDeleted = new EventEmitter;

	deleteQuestion(idx):void{
		this.questionDeleted.emit(idx);
	}

}
