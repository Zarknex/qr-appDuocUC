/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocaldbService } from 'src/app/services/localdb.service';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {
  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  };

  //Se establece la base url del API a consumir para testing -> API Fake normalmente iria la IPv4 192.168.1.123:3000
  //apiURL = 'https://jsonplaceholder.typicode.com';
  apiURL = 'http://localhost:3000/api';
  //Se declara la variable HTTP de tipo HTTPClient
  constructor(private http: HttpClient, private localdb: LocaldbService) { }

  signUpUser(user) {
    return this.http.post<any>(this.apiURL + '/signup', user);
  }

  signInUser(user) {
    return this.http.post<any>(this.apiURL + '/signin', user);
  }

  loggedIn() {
    return !!this.localdb.getToken();
  }
}
