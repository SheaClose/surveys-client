import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-numeric-question',
  templateUrl: './numeric-question.component.html',
  styleUrls: ['./numeric-question.component.css']
})
export class NumericQuestionComponent implements OnInit {
	@Input() public questionText: string;
	@Input() public response;
	@Input() public questionIndex;
	@Input() public questionType;
	@Input() public notAnswered;
	@Input() public lowValue;
	@Input() public highValue;
	@Input() public required;
  constructor() { }

  ngOnInit() {
		this.response.numericAnswer = Math.round(this.lowValue + 0.5*(this.highValue - this.lowValue))
  }
}
