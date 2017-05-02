import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CohortService {
  apiBaseUrl = 'http://localhost:3000';
  cohorts;
  constructor(
    private http: Http
  ) { }

  errorHandler(err) {
    console.log('error:', err.json());
    return err.json();
  }

  getCohorts() {
    return this.http
      .get(this.apiBaseUrl + '/api/admin/cohorts')
      .map( response => {
        console.log(response);
        this.cohorts = response;
        return response.json();
      })
      .catch( this.errorHandler );
  }

  updateCohort(cohort) {
    return this.http
     .put( `${this.apiBaseUrl}/api/admin/cohorts/${cohort._id}`, cohort)
     .map( res => res)
      .catch( this.errorHandler );
  }

  checkDevMountainCohorts() {
    return this.http
    .get( this.apiBaseUrl + '/api/admin/checkDevMountainCohorts')
    .map(res => res)
    .catch( this.errorHandler );
  }
}
