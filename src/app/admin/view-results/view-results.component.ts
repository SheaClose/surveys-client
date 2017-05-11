import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';
import { TemplateSurveyService } from '../templateSurveyService';
import { GridOptions } from 'ag-grid';
@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css'],
  providers: [SurveyService, TemplateSurveyService]
})
export class ViewResultsComponent implements OnInit {
  displaySurveys: any[] = [];
  filter: any = {};
  surveys: any[];
  showInactive = false;
  cohorts: any[] = [];
  campuses: any[] = [];
  topics: any[];
  survey: any;
  topic: any;
  results: any[];
  searchFilter: any = { nameDate: '' };
  gridOptions: GridOptions;
  resultsTotal: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private templateSurveyService: TemplateSurveyService
  ) {
    this.gridOptions = {
      columnDefs: null,
      rowData: null,
      enableColResize: true,
      enableSorting: true,
      headerHeight: 75,
      rowHeight: 75,
      floatingBottomRowData: []
    };
  }
  ngOnInit() {
    const { value }: any = this.route.data;
    this.surveys = value.surveys;
    this.parseDisplaySurveys(this.surveys);
    this.surveyService.getFilters().subscribe(response => {
      for (const key in response.cohorts) {
        this.campuses.push(key);
        this.cohorts.push({ [key]: response.cohorts[key] });
      }
      this.topics = response.topics;
    });
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.topic = null;
    }
  }
  parseDisplaySurveys(surveys) {
    this.displaySurveys = [];
    for (let i = 0; i < surveys.length; i++) {
      const dateObject = new Date(surveys[i].dateSent);
      const date = (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear();
      this.displaySurveys[i] = {};
      this.displaySurveys[i].nameDate = surveys[i].name + '___' + date;
      try {
        this.displaySurveys[i].nameDate += ' : ' + surveys[i].usersTaken.length + '/' + surveys[i].usersSentTo.length;
      } catch (err) {
      }
      this.displaySurveys[i]._id = surveys[i]._id;
    }
  }
  toggleInactive() {
    this.showInactive = !this.showInactive;
    if (this.showInactive) {
      this.filter.cohorts = this.cohorts.filter(c => c[this.filter.campus])[0][this.filter.campus];
    } else {
      this.filter.cohorts = this.cohorts.filter(c => c[this.filter.campus])[0][this.filter.campus].filter(c => c.active);
    }
  }
  clickCohort(key) {
    if (this.filter.cohort && this.filter.cohort[key]) {
      delete this.filter.cohort[key];
    } else if (!this.filter.cohort) {
      this.filter.cohort = {};
      this.filter.cohort[key] = true;
    } else {
      this.filter.cohort[key] = true;
    }
    this.getSurveys();
  }
  getCohorts(campus) {
    this.showInactive = false;
    this.filter.cohort = null;
    this.displaySurveys = [];
    this.filter.cohorts = this.cohorts.find(c => c[campus])[campus].filter(c => c.active);
    this.getSurveys();
  }
  getSurveys() {
    this.survey = null;
    if (this.filter.cohort && Object.keys(this.filter.cohort).length) {
      this.surveyService.getSurveys('?cohortSentTo=' + Object.keys(this.filter.cohort).join(','))
        .subscribe((response) => {
          this.parseDisplaySurveys(response);
        });
    } else {
      this.surveyService.getSurveys('?campus=' + this.filter.campus)
        .subscribe((response) => {
          this.parseDisplaySurveys(response);
        });
    }
  }
  loadSurveyResults() {
    this.templateSurveyService.getSurveyResults(this.survey._id)
      .subscribe((response) => {
        const results = response;
        const {answers, tooltipField} = this.templateSurveyService.loadQAData(this.survey, results);
        this.resultsTotal = answers.length;
        const questions = this.survey.questions.map((c, i) => {
          return {
            headerName: c.questionText,
            field: `column${i}`,
            width: 200,
            tooltipField: tooltipField ? tooltipField : null
          };
        });
        const averages = answers.reduce((accumulator, element) => {
          for (const prop in element) {
            if (!accumulator[prop]) {
              if (typeof element[prop] === 'number') {
                accumulator[prop] = element[prop];
              }
            } else if (accumulator[prop]) {
              accumulator[prop] += element[prop];
            }
          }
          return accumulator;
        }, {});
        for (const prop in averages) {
          averages[prop] = `Average: ${(averages[prop] / answers.length).toFixed(1)}`;
        }
        answers.push(averages);
        this.gridOptions.api.setColumnDefs(questions);
        this.gridOptions.api.setRowData(answers);
        this.gridOptions.api.sizeColumnsToFit();
      });
  }
  loadTopic() {
    this.templateSurveyService.getTopic(this.survey.topic)
      .subscribe((response) => {
        this.topic = response.pop();
        this.loadSurveyResults();
      });
  }
  loadSelectedSurvey(survey) {
    this.templateSurveyService.getSurvey(survey._id)
      .subscribe((response) => {
        this.survey = response;
        this.loadTopic();
      });
  }
}
