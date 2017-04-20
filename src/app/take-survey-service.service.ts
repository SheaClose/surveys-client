import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 										 'rxjs/add/operator/map';
import { Survey } 		from "./Survey"

@Injectable()
export class  TakeSurveyService {

	apiBaseUrl: string = "http://localhost:3000"

  constructor(private http: Http) {}

	getUntaken(studentId): Observable<Survey[]> {
		return this.http
			.get(this.apiBaseUrl + '/api/surveys/untaken/' + studentId)
			.map(response => {
				return response.json()
			})
	}
}
