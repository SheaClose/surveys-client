import { Component, OnInit } from '@angular/core';
import {CohortService} from '../cohort.service';

@Component({
  selector: 'app-cohort-analytics',
  templateUrl: './cohort-analytics.component.html',
  styleUrls: ['./cohort-analytics.component.css']
})
export class CohortAnalyticsComponent implements OnInit {
  locations;
  constructor(
    private cohortService: CohortService
  ) { }

  ngOnInit() {
    this.cohortService.getCohorts()
      .subscribe((response) => {
        this.locations = this.filterCohortInformation(response);
      });
  }

  filterCohortInformation(cohorts) {
    const returnArray = [];
    cohorts.forEach((item) => {
      const payload = {
        city: item.location.city,
        subject: item.subject,
        cohorts: null
      };
      const hasCity = (returnArray.map(e => e.city).indexOf(payload.city) > -1);
      const hasSubject = (returnArray.map(e => e.subject).indexOf(payload.subject) > -1);
      payload.cohorts = cohorts.filter(c => (c.location.city === payload.city && c.subject === payload.subject) );
      if (!(hasCity && hasSubject)) {
        returnArray.push(payload);
      }
    });
    return returnArray;
  }
}
