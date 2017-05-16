import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  // BASE_URL = 'https://surveys.devmountain.com/';
  BASE_URL = 'http://localhost:3000';
  constructor(private http: Http) { }

  checkForAuth(): Observable<any> {
    return this.http
      .get(this.BASE_URL + 'api/current_user')
      .map(response => {
        return response.json();
      });

  }
  checkForAdminAuth(): Observable<any> {
    return this.http
      .get(this.BASE_URL + 'api/current_admin_user')
      .map(response => response.status)
      .catch((res: any) => res);
  }
  logout(): Observable<any> {
    return this.http
      .get(this.BASE_URL + 'api/logout')
      .map(response => { return response.status; })
      .catch((res: any) => { return res; });
  }
  getAllTemplateNames(): Observable<any> {
    return this.http
      .get(this.BASE_URL + 'api/admin/templates/')
      .map(res => { return res; })
      .catch(err => { console.log(err); return err; });
  }
}
