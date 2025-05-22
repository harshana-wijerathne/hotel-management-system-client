import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../../auth/components/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getRooms(pageNumber: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/customer/rooms/" + pageNumber, {
      headers: this.createAuthorizationHeader(),
    })
  }

  bookRoom(bookingDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/customer/book", bookingDto,{
      headers: this.createAuthorizationHeader()
    })
  }



  private createAuthorizationHeader() {
    let authHeaders = new HttpHeaders()
    return authHeaders.set(
      'Authorization',
      "Bearer " + UserStorageService.getToken()
    )


  }
}
