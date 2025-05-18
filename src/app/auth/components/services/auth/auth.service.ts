import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";  
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

const BASIC_URL = "http://localhost:8080/"
  
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  register(signupRequest:any): Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/signup",signupRequest)
  }

  login(loginRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + 'api/auth/login', loginRequest);
  }
}
