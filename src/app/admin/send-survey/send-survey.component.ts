import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateSurveyService } from '../templateSurveyService';
import { CohortService } from '../../cohort.service';
@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.css'],
  providers: [TemplateSurveyService, CohortService]
})
export class SendSurveyComponent implements OnInit {
  errorMsg: string;
  prevSurvey: any;
  cohorts: any[] = [];
  templates: any;
  topics: any;
  template: any;
  var_names: any[] = [];
  var_values: any[] = [];
  varsCompiled = false;
  survey: any = {
    name: '',
    description: '',
    topic: '',
    cohortSentTo: '',
    repeatable: true,
    optional: true,
    questions: []
  };
  previewSelected = false;
  i: number;
  selectedTemplate: any;
  newSurvey: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private templateSurveyService: TemplateSurveyService,
    private cohortService: CohortService
  ) {
    cohortService.getCohorts().subscribe((res) => {
      this.cohorts = [...res, { dmCohortId: -1, name: 'All 1 Week Limit', active: true }];
    });
  }
  ngOnInit() {
    const { value }: any = this.route.data;
    this.topics = value.topics;
    this.templates = value.templates.json();
  }
  loadSelectedTemplate() {
    this.templateSurveyService
      .getTemplate(this.selectedTemplate._id)
      .subscribe(res => {
        this.survey.name = res.name;
        this.survey.description = res.description;
        this.survey.questions = res.questions;
        this.var_names = this.templateSurveyService.checkForVars(this.survey);
      });
  }
  previewSurvey() {
    this.previewSelected = true;
    this.prevSurvey = this.templateSurveyService
      .compileVariables(
      this.survey,
      this.var_names,
      this.var_values
      );
    this.varsCompiled = true;
  }
  writeSurvey() {
    this.templateSurveyService.writeNewSurvey({
      name: this.newSurvey.name,
      description: this.newSurvey.description,
      cohortSentTo: this.newSurvey.cohortSentTo.dmCohortId,
      dateSent: this.newSurvey.dateSent,
      topic: this.newSurvey.topic._id,
      repeatable: this.newSurvey.repeatable,
      questions: this.newSurvey.questions
    })
      .subscribe((response): any => {
        if (response.status === 200) {
          this.router.navigate(['/admin'], { queryParams: { toastMessage: 'Survey Successfully Sent' } });
        } else {
          this.errorMsg = 'Error in Sending Survey';
        }
      });
  }
  processForm() {
    if (!this.survey.topic) {
      return alert('Must select a topic');
    }
    this.newSurvey = this.templateSurveyService
      .compileVariables(
      this.survey,
      this.var_names,
      this.var_values
      );
    this.newSurvey.dateSent = new Date();
    this.writeSurvey();
  }
}
