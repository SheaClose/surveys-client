import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateSurveyService } from '../templateSurveyService';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css'],
  providers: [ TemplateSurveyService ]
})
export class CreateTopicComponent implements OnInit {
  newTopic: string;
  topics: Array<any>;
  topic: any;

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateSurveyService
  ) { }

  ngOnInit() {
    const {value}: any = this.route.data;
    this.topics = value.templates;
  }
  addTopic() {
    this.templateService
      .addNewTopic( { name: this.newTopic } )
      .subscribe(( res ) => {
        this.topics.push(res);
        this.newTopic = '';
      });
  }
}
