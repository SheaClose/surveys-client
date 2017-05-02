import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-survey',
  templateUrl: './preview-survey.component.html',
  styleUrls: ['./preview-survey.component.css']
})
export class PreviewSurveyComponent implements OnInit {
  question;
  @Input() public surveyName;
  @Input() public surveyDescription;
  @Input() public surveyTopic;
  @Input() public surveyQuestions;
  constructor() { }

  ngOnInit() {
  }

}
