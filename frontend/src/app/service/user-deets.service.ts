import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDeetsService {

  constructor( private http: HttpClient) { }
  apiURL : string = "http://192.168.0.116:7016"

  getUserDetails() {
    // return this.http.get(`${this.apiURL}/api/user/getAllUser`);
    const url = `${this.apiURL}/api/user/getAllUser`;
    return this.http
      .get<{
        success: boolean;
        message: string;
        data: any;
      }>(url)
  }
}
