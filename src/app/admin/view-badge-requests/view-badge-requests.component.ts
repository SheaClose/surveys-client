import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-view-badge-requests',
  templateUrl: './view-badge-requests.component.html',
  styleUrls: ['./view-badge-requests.component.css'],
  providers: [SurveyService]
})
export class ViewBadgeRequestsComponent implements OnInit {
  filter;
  badges: any[];
  filteredBadges: any[];
  seeOld = false;

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.filter = {
      topic: '5858497b3d10af480a492629'
    };
    this.surveyService
      .queryResults(this.filter)
      .subscribe((response) => {
        this.badges = response.map(c => {
          return Object.assign({ editing: false }, c);
        });
        this.filteredBadges = this.badges.filter(c => !c.archived);
      });
  }

  toggleOld() {
    this.seeOld = !this.seeOld;
    if (this.seeOld) {
      this.filteredBadges = this.badges;
    } else {
      this.filteredBadges = this.badges.filter(c => !c.archived);
    }
  }

  submitBadge(badge) {
    delete badge.editing;
    this.surveyService
      .badgeUser(badge)
      .subscribe((response) => {
        badge.finished = true;
      });
  }
}
