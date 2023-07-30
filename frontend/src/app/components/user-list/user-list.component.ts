import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserDeetsService } from 'src/app/service/user-deets.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  userForm!: FormGroup;
  data: Object;
  constructor (private userDetails : UserDeetsService,
    private formBuilder : FormBuilder ) {}
  initiateForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }
  ngOnInit():void
{
this.fetchUserDetails();
}

fetchUserDetails() : void{
  this.userDetails.getUser().subscribe(
(response : any) =>{
  console.log(response)
  this.data = response
  this.userForm.patchValue({
    email : response.email,
    username : response.firstName,
    lastname: response.walletAddress
  })
}
  )
}




}

