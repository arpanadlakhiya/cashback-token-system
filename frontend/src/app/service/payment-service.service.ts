import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor() {


   }
getAllUsers(){
  const users = [{
    id: 1,
    name : "USER 1"
  },
  {
    id: 2,
    name : "USER 2"
  },
  {
    id: 3,
    name : "USER 3"
  },
  {
    id: 4,
    name : "USER 4"
  },
  {
    id: 5,
    name : "USER 5"
  }
];

return of (users)
}

getAllOffers(){
  const offers = [{
    id: 1,
    name : "Offer 1"
  },
  {
    id: 2,
    name : "Offer 2"
  },
  {
    id: 3,
    name : "Offer 3"
  },
  {
    id: 4,
    name : "Offer 4"
  },
  {
    id: 5,
    name : "Offer 5"
  }
];

return of (offers)
}
}
