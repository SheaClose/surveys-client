import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';
import { TemplateSurveyService } from '../templateSurveyService';
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
  cohortSelected = false;
  showInactive = false;
  cohorts: any[] = [];
  topics;
  survey;
  userReportData;
  q_a_columns;
  q_a_data;
  q_a_options;
  results;
  usersRequested;
  usersUntaken;
  topic;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private templateSurveyService: TemplateSurveyService
  ) { }

  ngOnInit() {
    const { value }: any = this.route.data;
    this.surveys = value.surveys;
    this.parseDisplaySurveys(this.surveys);
    this.surveyService.getFilters().subscribe(response => {
      console.log(response.cohorts);
      for ( const key in response.cohorts) {
        this.cohorts.push( key );
      }
      this.topics = response.topics;
    });
    this.q_a_options = {
      data: 'q_a_data',
      showGridFooter: true,
      showColumnFooter: true,
      exporterCsvFilename: 'surveyData.csv',
      enableGridMenu: true,
      exporterMenuPdf: false
    };
  }
  parseDisplaySurveys(surveys) {
    for (let i = 0; i < surveys.length; i++) {
      const dateObject = new Date(surveys[i].dateSent);
      const date = (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear();
      this.displaySurveys[i] = {};
      this.displaySurveys[i].nameDate = surveys[i].name + '___' + date;
      try {
        this.displaySurveys[i].nameDate += ' : ' + surveys[i].usersTaken.length + '/' + surveys[i].usersSentTo.length;
      } catch (err) {
        // console.log('No usersTaken or usersSentTo Data', err);
      }
      this.displaySurveys[i]._id = surveys[i]._id;
    }
    console.log(this.displaySurveys);
  }
  toggleInactive() {
    this.showInactive = !this.showInactive;
  }
  /* NOTE: This may have to be edited... Not sure how to implement in ng2. */
  // watchCollection(newVal) {
  //   console.log(newVal);
  //   if (newVal) {
  //     let trueCounter = 0;
  //     for (const key in newVal) {
  //       if (newVal[key]) {
  //         trueCounter++;
  //       }
  //     }
  //     if (!trueCounter) {
  //       this.filter.cohort = {};
  //       this.cohortSelected = false;
  //     } else {
  //       this.cohortSelected = true;
  //     }
  //     this.getSurveys();
  //   }
  //   console.log(newVal);
  // }
  clickCohort(key) {
    if (this.filter.cohort && this.filter.cohort[key]) {
      this.filter.cohort[key] = false;
    } else if (!this.filter.cohort) {
      this.filter.cohort = {};
      this.filter.cohort[key] = true;
    } else {
      this.filter.cohort[key] = true;
    }
    // this.getSurveys();
  }
  getSurveys() {
    let toFilter, filterForServer;
    if (this.filter.cohort && Object.keys(this.filter.cohort).length) {
       toFilter = {
         cohortSentTo: this.filter.cohort
       };
       if (this.filter.topic) {
         toFilter[this.filter.topic] = true;
         filterForServer = this.makeQuery(toFilter);
       } else {
         filterForServer = this.filter;
       }
       // console.log(filterForServer);
       this.survey = null;
       this.surveyService.getSurveys(filterForServer)
         .subscribe((response) => {
           console.log('SURVEY RESULTS', response);
           this.parseDisplaySurveys(response);
         });
     }
     console.log(this.filter);
   }
  makeQuery(obj) {
    const objToReturn = {};
    for (const prop in obj) {
      const list = obj[prop];
      for (const key in list) {
        if (list[key]) {
          if (objToReturn[prop]) {
            objToReturn[prop].push(key);
          } else {
            objToReturn[prop] = [key];
          }
        }
      }
    }
    return objToReturn;
  }
  loadSurveyResults() {
    this.templateSurveyService.getSurveyResults(this.survey._id)
      .subscribe((response) => {
        this.results = response;
        this.userReportData = this.templateSurveyService.loadUserReportData(this.usersRequested, this.usersUntaken);
        this.q_a_columns = this.templateSurveyService.loadQAColumns(this.survey, this.results);
        this.q_a_options.columnDefs = this.q_a_columns;
        this.q_a_data = this.templateSurveyService.loadQAData(this.survey, this.results);
        window.dispatchEvent(new Event('resize'));
      });
  }
  loadUsersUntaken() {
    this.templateSurveyService.getSurveyUsersUntaken(this.survey._id)
      .subscribe((response) => {
        this.usersUntaken = response.data;
        this.loadSurveyResults();
      });
  }
  loadUsersSentTo() {
    this.templateSurveyService.getSurveyUsersSentTo(this.survey._id)
      .subscribe((response) => {
        this.usersRequested = response.data;
        this.loadUsersUntaken();
      });
  }
  loadTopic() {
    this.templateSurveyService.getTopic(this.survey.topic)
      .subscribe((response) => {
        this.topic = response.data;
        this.loadUsersSentTo();
      });
  }
  loadSelectedSurvey(survey) {
    console.log(survey);
    // this.templateSurveyService.getSurvey(survey._id)
    //   .subscribe((response) => {
    //     this.survey = response.data;
    //     this.loadTopic();
    //   });
  }
}
