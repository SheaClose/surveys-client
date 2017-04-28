import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';
import { AuthService } from '../auth-service.service';

@Injectable()
export class StudentResolver implements Resolve<any> {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.authService
      .checkForAuth()
      .catch((res: any) => {
        this.router.navigate(['/landing']);
        return res;
      });
  }
}
