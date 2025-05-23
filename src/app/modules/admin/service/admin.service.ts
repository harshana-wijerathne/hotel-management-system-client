import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../../auth/components/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  postRoomDetails(roomDto:any):Observable<any> {
    return this.http.post(BASIC_URL+"api/admin/room", roomDto ,{
      headers:this.createAuthorizationHeader(),
    })
  }

  getRooms(pageNumber:number):Observable<any> {
    return this.http.get(BASIC_URL+"api/admin/rooms/"+pageNumber,{
      headers:this.createAuthorizationHeader(),
    })
  }

  getRoomById(id:number):Observable<any> {
    return this.http.get(BASIC_URL+"api/admin/room/"+id,{
      headers:this.createAuthorizationHeader(),
    })
  }

  updateRoomDetails(id:number,roomDto:any):Observable<any> {
    return this.http.put(BASIC_URL+`api/admin/room/${id}`, roomDto ,{
      headers:this.createAuthorizationHeader(),
    })
  }

  deleteRoom(id:number):Observable<any> {
    return this.http.delete(BASIC_URL+`api/admin/room/${id}`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  getReservations(pageNumber:number):Observable<any> {
    return this.http.get(BASIC_URL+"api/admin/reservation/"+pageNumber,{
      headers:this.createAuthorizationHeader(),
    })
  }

  changeReservationStatus(reservationId:number,status:string):Observable<any> {
    return this.http.post(BASIC_URL+"api/admin/reservation/"+reservationId+"/"+status,null,{
      headers:this.createAuthorizationHeader(),
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
