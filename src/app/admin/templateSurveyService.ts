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
    console.log(template);
    return this.http
      .post(this.apiBaseUrl + '/api/admin/templates/', template)
      .map((res) => {
        return res.json();
      })
      .catch(this.errorHandler);
  }

}
