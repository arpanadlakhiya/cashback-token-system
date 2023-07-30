import { Component } from '@angular/core';
import { UserDeetsService } from 'src/app/service/user-deets.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  

  constructor (private userDetails : UserDeetsService) {}
  ngOnInit():void
{
this.fetchUserDetails();
}

fetchUserDetails() : void{
  this.userDetails.getUserDetails().subscribe(
(response) =>{
  console.log(response)
}
  )
}
}
