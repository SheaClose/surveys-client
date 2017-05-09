import { Component, OnInit } from '@angular/core';
import { CohortService } from '../cohort.service';

@Component({
  selector: 'app-cohort-admin',
  templateUrl: './cohort-admin.component.html',
  styleUrls: ['./cohort-admin.component.css']
})
export class CohortAdminComponent implements OnInit {
  locations: string[] = ['Provo', 'Salt Lake City', 'Dallas', 'Mesa'];
  types: string[] = ['full', 'part'];
  subjects: string[] = ['webdev', 'ui/ux', 'ios'];
  cohorts: any[];
  edit = false;

  constructor(
    private cohortService: CohortService
  ) { }

  ngOnInit() {
    this.cohortService
      .getCohorts()
      .subscribe((response) => {
        this.cohorts = response;
      });
  }

  updateCohort(cohort) {
    if (this.edit) {
      this.cohortService.updateCohort(cohort);
    } else {
      console.log('No changes to save.');
    }
  }

  check() {
    this.cohortService.checkDevMountainCohorts();
    setTimeout(() => {
      this.cohortService
        .getCohorts()
        .subscribe((response) => {
          this.cohorts = response;
        });
    }, 1000);
  }

}
