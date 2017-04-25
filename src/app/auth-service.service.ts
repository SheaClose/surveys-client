import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 										 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	baseUrl: string = "http://localhost:3000/"
  constructor(private http: Http) {}

  checkForAuth(): Observable<any> {
    return this.http
			.get(this.baseUrl + 'api/current_user')
			.map(response => {
				return response.json()
			})

  }
	logout(): Observable<any> {
		return this.http
			.get( this.baseUrl + 'api/logout' )
			.map( response => {
				return response.status
			})
			.catch((res :any) => {
				console.log(res);
				return res
			})
	}
}
