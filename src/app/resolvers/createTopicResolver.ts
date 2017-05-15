import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { TemplateSurveyService } from '../admin/templateSurveyService';

@Injectable()
export class CreateTopicResolver implements Resolve<any> {
  constructor(
    private templateSurveyService: TemplateSurveyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.templateSurveyService
      .getAllTopicNames()
      .catch( (err: any) => {
        console.error('err = ', err);
        if (err.status === 403) { //  if unauthorized
          this.router.navigate(['/admin']);
        }
        return err;
      });
  }
}
