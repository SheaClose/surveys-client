import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Survey } from './Survey';

@Injectable()
export class TakeSurveyService {

  // BASE_URL = 'https://surveys.devmountain.com/';
  BASE_URL = 'http://localhost:3000';

  constructor(private http: Http) { }

  errorHandler(err) {
    console.log('error:', err);
    return err;
  }
  getUntaken(studentId: string): Observable<Survey[]> {
    return this.http
      .get(this.BASE_URL + '/api/surveys/untaken/' + studentId)
      .map(student => student.json())
      .catch(this.errorHandler);
  }
  getSurvey(surveyId: string): Observable<any> {
    return this.http
      .get(this.BASE_URL + '/api/surveys/' + surveyId)
      .map(survey => survey.json())
      .catch(this.errorHandler);
  }
  getTopic(topicId) {
    return this.http
      .get(this.BASE_URL + '/api/topics?_id=' + topicId)
      .map(topic => topic.json().pop())
      .catch(this.errorHandler);
  }
  writeSurveyResults(data) {
    return this.http
      .post(this.BASE_URL + '/api/surveys/results', data)
      .map(topic => {
        return topic.status;
      })
      .catch(this.errorHandler);
  }
}
