import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { TemplateSurveyService } from '../admin/templateSurveyService';
import { AuthService } from '../auth-service.service';

@Injectable()
export class SendSurveyResolver implements Resolve<any> {
  topics;
  templates;
  constructor(
    private templateSurveyService: TemplateSurveyService,
    private router: Router,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.templateSurveyService
      .getAllTopicNames()
      .catch( (err: any) => {
        console.error('err = ', err);
        if (err.status === 403) { //  if unauthorized
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/admin'], {
            queryParams: {
              successRedirect: 'createModifyTemplate'
            }
          });
        }
        return err;
      });
  }
}
