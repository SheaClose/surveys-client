import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-boolean-question',
  templateUrl: './boolean-question.component.html',
  styleUrls: ['./boolean-question.component.css']
})
export class BooleanQuestionComponent implements OnInit {
  @Input() public required: any;
  @Input() public questionText: any;
  @Input() public response: any;
  @Input() public questionIndex: any;
  @Input() public questionType: any;
  @Input() public notAnswered: any;
  @Input() public borderOnYes: any;
  @Input() public borderOnNo: any;
  constructor() { }

  ngOnInit() {
  }

  handleBooleanAnswer(answer, indx) {
    this.response.booleanAnswer = answer;
    this.response.booleanAnswerCompleted = true;
    if (answer) {
      this.borderOnYes[indx] = true;
      this.borderOnNo[indx] = false;
    } else {
      this.borderOnNo[indx] = true;
      this.borderOnYes[indx] = false;
    }
  }

}
