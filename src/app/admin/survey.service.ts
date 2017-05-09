import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SurveyService {
  BASE_URL = 'http://localhost:3000';
  constructor(private http: Http) { }

  errorHandler(err) {
    console.log('error:', err.json());
    return err.json();
  }

  getFilters() {
    return this.http.get(this.BASE_URL + '/api/admin/surveyfilter')
      .map((response): any => {
        if (response.status === 200) {
          return response.json();
        }
      }).catch(this.errorHandler);
  }

  getAnalytics(id) {
    return this.http
      .get(this.BASE_URL + '/api/admin/results/analytics/' + id)
      .map((response): any => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .catch(this.errorHandler);
  }

  getSurveys(filter) {
    const queryString = this.serialize(filter);
    return this.http
      .get(this.BASE_URL + '/api/admin/surveys' + queryString)
      .map((response): any => {
        if (response.status === 200) {
          return response.json();
        }
      }).catch(this.errorHandler);
  }

  queryResults(qry) {
    const queryString = this.serialize(qry);
    return this.http
      .get(this.BASE_URL + '/api/admin/results' + queryString)
      .map((response): any => {
        if (response.status === 200) {
          return response.json();
        }
      }).catch(this.errorHandler);
  }

  serialize(obj) {
    return '?' + Object.keys(obj).reduce((a, k) => {
      a.push(k + '=' + encodeURIComponent(obj[k]));
      return a;
    }, []).join('&');
  }

  badgeUser(badge) {
    return this.http.post(this.BASE_URL + '/api/admin/badge', badge)
      .map((response): any => {
        if (response.status === 200) {
          return response.json();
        }
      }).catch(this.errorHandler);
  }
}
