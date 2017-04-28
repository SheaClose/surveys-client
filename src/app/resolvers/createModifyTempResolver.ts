import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';
import { AuthService } from '../auth-service.service';

@Injectable()
export class CreateModifyTempResolver implements Resolve<any> {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.authService
      .getAllTemplateNames()
      .catch((err: any) => {
        console.error('err = ', err);
        if (err.status === 403) { //  if unauthorized
          this.router.navigate(['/student']);
        } else {
          this.router.navigate(['/landing'], {
            queryParams: {
              successRedirect: 'createModifyTemplate'
            }
          });
        }
        return err;
      });
  }
}
