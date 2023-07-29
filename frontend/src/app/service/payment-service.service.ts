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
return this.http.get<{
  success: boolean;
  message: string;
  data: any;
}>(`${this.apiURL}/api/user/get-users`);
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
//   const offers = [{
//     id: 1,
//     name : "Offer 1"
//   },
//   {
//     id: 2,
//     name : "Offer 2"
//   },
//   {
//     id: 3,
//     name : "Offer 3"
//   },
//   {
//     id: 4,
//     name : "Offer 4"
//   },
//   {
//     id: 5,
//     name : "Offer 5"
//   }
// ];

// return of (offers)
// }
}
