import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) {}


  apiURL : string = "http://192.168.0.116:7016"
getAllUsers(){
  let url = this.apiURL+'/api/user/get-users';
return this.http.get(url);
}

getAllOffers(amount : number){

  return this.http.get<{
    success: boolean;
    message: string;
    data: any;
  }>(`${this.apiURL}/api/transaction/get-pre-txn-details`).pipe(
    map((response : any)=>
    response.data.applicableOffers)
  );
  }

  
}
