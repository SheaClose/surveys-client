import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';
import { TemplateSurveyService } from '../admin/templateSurveyService';

@Injectable()
export class ViewResultsResolver implements Resolve<any> {

  constructor(
    private router: Router,
    private templateSurveyService: TemplateSurveyService
  ) { }

  resolve(): Observable<any> | Promise<any> | any {
    return this.templateSurveyService
      .getAllSurveyNamesAndDates()
      .catch((res: any) => {
        if (res.status === 403) {
          this.router.navigate(['/student']);
        } else {
          this.router.navigate(['/landing']);
          return res;
        }
      });
  }
}
