import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplateSurveyService {

  apiBaseUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  errorHandler(err) {
    console.log('error:', err.json());
    return err.json();
  }
  getTemplate(id) {
    return this.http
      .get(this.apiBaseUrl + '/api/admin/templates/' + id)
      .map((res) => {
        return res.json();
      })
      .catch(this.errorHandler);
  }
  updateTemplate(templateId, template) {
    return this.http
      .put(this.apiBaseUrl + '/api/admin/templates/' + templateId, template)
      .map((res) => {
        return res.json();
      })
      .catch(this.errorHandler);
  }
  writeNewTemplate(template) {
    return this.http
      .post(this.apiBaseUrl + '/api/admin/templates/', template)
      .map((res) => {
        return res.json();
      })
      .catch(this.errorHandler);
  }
  getAllTopicNames() {
    return this.http
      .get(this.apiBaseUrl + '/api/admin/topics/')
      .map(res => res.json())
      .catch(this.errorHandler);
  }
  addNewTopic(data) {
    return this.http
      .post(this.apiBaseUrl + '/api/admin/topics/', data)
      .map(res => {
        return res.json();
      })
      .catch(this.errorHandler);
  }
  writeNewSurvey(data) {
    return this.http.post(this.apiBaseUrl + '/api/admin/surveys/', data)
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  getAllSurveyNamesAndDates() {
    return this.http.get(this.apiBaseUrl + '/api/admin/surveys/names_dates')
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  getSurvey(id) {
    return this.http.get(this.apiBaseUrl + '/api/admin/surveys/' + id)
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  getTopic(topic_id) {
    return this.http.get(this.apiBaseUrl + '/api/admin/topics?_id=' + topic_id)
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  getSurveyUsersSentTo(survey_id) {
    return this.http.get(this.apiBaseUrl + '/api/admin/surveys/sent_to/' + survey_id)
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  getSurveyUsersUntaken(survey_id) {
    return this.http.get(this.apiBaseUrl + '/api/admin/surveys/untaken/' + survey_id)
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  getSurveyResults(survey_id) {
    return this.http
      .get(this.apiBaseUrl + '/api/admin/results/' + survey_id)
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  checkForAdminAuth(survey_id) {
    return this.http
      .get(this.apiBaseUrl + '/api/admin/current_user')
      .map(res => res.json())
      .catch(this.errorHandler);
  };
  // Non-CRUD

  findMatch(str) { // look for $$something$$
    const regex = /\$\$(.*?)\$\$/g;
    const resultArr = [];
    let arr = regex.exec(str);
    while (arr !== null) {
      resultArr.push(arr[1]);
      arr = regex.exec(str);
    }
    return resultArr;
  }

  checkForVars(survey) {
    const arrayOfVars = [];
    const nameMatch = this.findMatch(survey.name);
    if (nameMatch) {
      for (let i = 0; i < nameMatch.length; i++) {
        arrayOfVars.push(nameMatch[i]);
      }
    }
    const descriptionMatch = this.findMatch(survey.description);
    if (descriptionMatch) {
      for (let i = 0; i < descriptionMatch.length; i++) {
        arrayOfVars.push(descriptionMatch[i]);
      }
    }
    for (let i = 0; i < survey.questions.length; i++) {
      const match = this.findMatch(survey.questions[i].questionText);
      if (match) {
        for (let j = 0; j < match.length; j++) {
          arrayOfVars.push(match[j]);
        }
      }
    }
    return arrayOfVars.reduce((acc, c) => {
      return !(acc.includes(c)) ? acc = [...acc, c] : acc;
    }, []);
  };

  compileVariables(survey, letNames, letValues) {
    const arrayOfVars = [];
    const newSurvey = JSON.parse(JSON.stringify(survey));

    if (letNames && letValues) {
      for (let i = 0; i < letNames.length; i++) {
        const regexstring = '\\$\\$' + letNames[i] + '\\$\\$';
        const regexp = new RegExp(regexstring, 'g');
        newSurvey.name = newSurvey.name.replace(regexp, letValues[i]);
        newSurvey.description = newSurvey.description.replace(regexp, letValues[i]);
        for (let j = 0; j < newSurvey.questions.length; j++) {
          newSurvey.questions[j].questionText = newSurvey.questions[j].questionText.replace(regexp, letValues[i]);
        }
      }
    }
    return newSurvey;
  };

  loadQAData(survey, results) {
    const answers = [];
    let tooltipField;
    for (let i = 0; i < results.length; i++) {
      answers[i] = {};
      for (let j = 0; j < results[i].answers.length; j++) {
        const columnId = 'column' + j;
        switch (results[i].answers[j].type) {
          case 'numeric':
            if (results[i].answers[j].hasOwnProperty('numericAnswer')) {
              answers[i][columnId] = results[i].answers[j].numericAnswer;
            } else {
              answers[i][columnId] = '';
            }
            break;
          case 'boolean':
            if (results[i].answers[j].hasOwnProperty('booleanAnswer')) {
              if (results[i].answers[j].booleanAnswer) {
                answers[i][columnId] = 'Yes';
              } else {
                answers[i][columnId] = 'No';
              }
            }
            break;
          case 'text':
            if (results[i].answers[j].hasOwnProperty('textAnswer')) {
              answers[i][columnId] = results[i].answers[j].textAnswer;
              tooltipField = columnId;
            } else {
              answers[i][columnId] = '';
            }
            break;
        }
      }
    }
    return { answers, tooltipField };
  };
}
