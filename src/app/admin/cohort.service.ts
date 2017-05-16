import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CohortService {

  BASE_URL = 'http://localhost:3000';
  cohorts;

  constructor(private http: Http) { }
  errorHandler(err) {
    console.log('error:', err.json());
    return err.json();
  }
  getCohorts() {
    return this.http
      .get(this.BASE_URL + '/api/admin/cohorts')
      .map((response) => {
        // console.log(response.json());
        this.cohorts = response.json();
        return response.json();
      })
      .catch(this.errorHandler);
  }

  updateCohort(cohort) {
    return this.http
      .put(this.BASE_URL + '/api/admin/cohorts/' + cohort._id, cohort)
      .map((response) => {
        return response.json();
      })
      .catch(this.errorHandler);
  }

  checkDevMountainCohorts() {
    return this.http
      .get(this.BASE_URL + '/api/admin/checkDevMountainCohorts')
      .map((response) => {
        this.cohorts = response.json();
        return response.json();
      })
      .catch(this.errorHandler);
  }
}
