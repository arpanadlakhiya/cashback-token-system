import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) {}
  apiURL : string = "/http://192.168.0.116:7016"
 
  registerUser(blobData: any) {
    console.log("blobData",blobData)
    return this.http.post<{
      success: boolean;
      message: string;
      data: any;
    }>(`${this.apiURL}/api/user/register`, blobData);
  }
}

