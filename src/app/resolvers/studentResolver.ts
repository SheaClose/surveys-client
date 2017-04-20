import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../auth-service.service';

@Injectable()
export class StudentResolver implements Resolve<any> {
  constructor( private authService: AuthService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any>|Promise<any>|any {
    return this.authService.checkForAuth();
  }
}
