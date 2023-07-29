import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentServiceService } from 'src/app/service/payment-service.service';


@Component({
  selector: 'app-paymentboard',
  templateUrl: './paymentboard.component.html',
  styleUrls: ['./paymentboard.component.scss']
})
export class PaymentboardComponent {
  userForm!: FormGroup;

  userInfo = { firstName: 'Rohan', lastName: 'Parasad', email: 'rohan.prasad234@gmail.com' };
  userData: { id: number; name: string; }[] = [];
  offerData: { id: number; name: string; }[] = [];
  ifAvailable: boolean = false;
  added: boolean = false;
  ifOffers:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: PaymentServiceService
  ) {

  }

  ngOnInit(): void {
    this.initiateForm();
    this.getUsers();
  }

  initiateForm(): void {
    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      token: ['', Validators.required],
      amount: ['', Validators.required],
      offers: ['', Validators.required],

    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      // Form is valid, perform form submission or data handling logic
      console.log(this.userForm.value);
    }
  }

  getUsers() {
    this.service.getAllUsers().subscribe((data: any) =>
      data.forEach((element: any) => {

        this.userData.push(element.name)

      })
    )
  }

  getOffers() {
    this.service.getAllOffers().subscribe((data: any) =>
      data.forEach((element: any) => {
        if (!(this.added)) {
          this.offerData.push(element.name)
        }
      })
    )
    this.added = true
  }

  get token() {
    return this.userForm.get('token')
  }


  get amount() {
    return this.userForm.get('amount')
  }

  checkAvailability() {
    if ((this.amount?.invalid)) {
      return false
    }
    else {
      return true
    }
  }

  getTokens() {
    if(this.checkAvailability()){
      this.userForm.patchValue({
        token: 5
      })
      this.getOffers()
      this.ifOffers = true
    }
    else{
      this.ifOffers = false
    }
  }
}
