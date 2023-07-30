import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) {}
  apiURL : string = "http://192.168.0.116:7016"
 
  registerUser(blobData: any) {
    let url = this.apiURL+'/api/user/register';
    console.log("blobData",blobData)
    return this.http.post(url, blobData);
  }

  loginUser(blobData: any) {
    let url = this.apiURL+'/api/user/login';
    console.log("blobData",blobData)
    return this.http.post(url, blobData);
  }
}

