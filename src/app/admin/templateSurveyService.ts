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

  findWhoTookSurvey(users_requested, users_untaken) {
    const userTookSurvey = [];
    users_requested.forEach((user, index, array) => {
      let tookSurvey = true;
      users_untaken.forEach((us, ind, arr) => {
        if (user._id === us._id) {
          tookSurvey = false;
        }
      });
      if (tookSurvey) {
        userTookSurvey[index] = 'Yes';
      } else {
        userTookSurvey[index] = 'No';
      }
    });
    return userTookSurvey;
  };

  loadUserReportData(usersRequested, usersUntaken) {
    const newArray = [];
    const tookSurvey = this.findWhoTookSurvey(usersRequested, usersUntaken);
    for (let i = 0; i < usersRequested.length; i++) {
      newArray.push({
        'first_name': usersRequested[i].first_name,
        'last_name': usersRequested[i].last_name,
        'took_survey': tookSurvey[i]
      });
    }
    return newArray;
  };

  getYesNoFooterCellTemplate() {
    return '<div class="ui-grid-cell-contents" col-index="renderIndex"> <div> Yes: {{col.getAggregationValue()}}</div> </div>';
  };

  getNumericFooterCellTemplate() {
    return `<div class="ui-grid-cell-contents"
        col-index="renderIndex"> <div> {{col.getAggregationText()}}
        {{col.getAggregationValue() | number:1 }}</div></div>`;
  };

  calculateYesCount(visRows, self) {
    let yesCount = 0;
    const column_id = self.name;
    visRows.forEach((row, index, array) => {
      if (row.entity[column_id] === 'Yes') {
        yesCount++;
      }
    });
    return yesCount;
  };

  loadQAColumns(survey, results) {
    const newArray = [];
    for (let i = 0; i < survey.questions.length; i++) {
      const w = 250;
      newArray.push({
        field: 'column' + i,
        displayName: survey.questions[i].questionText,
        width: w,
        headerTooltip: true,
        enableHiding: false,
        headerCellClass: 'grid_header'
      });
      switch (survey.questions[i].type) {
        case 'numeric':
          newArray[i].footerCellTemplate = this.getNumericFooterCellTemplate();
          break;
        case 'boolean':
          newArray[i].footerCellTemplate = this.getYesNoFooterCellTemplate();
          newArray[i].aggregationType = this.calculateYesCount;
          break;
        case 'text':
          newArray[i].cellTooltip = true;
          break;
      }
    }
    return newArray;
  };

  loadQAData(survey, results) {
    const newArray = [];
    for (let i = 0; i < results.length; i++) {
      newArray[i] = {};
      for (let j = 0; j < results[i].answers.length; j++) {
        const columnId = 'column' + j;
        switch (results[i].answers[j].type) {
          case 'numeric':
            if (results[i].answers[j].hasOwnProperty('numericAnswer')) {
              newArray[i][columnId] = results[i].answers[j].numericAnswer;
            }
            break;
          case 'boolean':
            if (results[i].answers[j].hasOwnProperty('booleanAnswer')) {
              if (results[i].answers[j].booleanAnswer) {
                newArray[i][columnId] = 'Yes';
              } else {
                newArray[i][columnId] = 'No';
              }
            }
            break;
          case 'text':
            if (results[i].answers[j].hasOwnProperty('textAnswer')) {
              newArray[i][columnId] = results[i].answers[j].textAnswer;
            }
            break;
        }
      }
    }
    return newArray;
  };
}
