import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css']
})
export class TextQuestionComponent implements OnInit {
  @Input() public questionText: string;
  @Input() public response;
  @Input() public questionIndex;
  @Input() public questionType;
  @Input() public notAnswered;
  @Input() public required;

  constructor() { }

  ngOnInit() {
  }

}
