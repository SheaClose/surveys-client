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
  }

  styleThumb() {
    setTimeout(() => {
      const { style }: any = document.getElementsByClassName('thumb active')[0];
      style.display = 'none';
    }, .5);
  }
}
