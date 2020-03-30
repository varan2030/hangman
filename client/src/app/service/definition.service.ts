import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {
  constructor(private http: HttpClient) {}

  configUrl =
    'https://dvb3ks499e.execute-api.us-east-1.amazonaws.com/dev/definition/';

  getDefinition(url): Observable<any> {
    return this.http.get(this.configUrl + url);
  }
}
