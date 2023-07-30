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
  applicableOffers:any[] = [];
  displayapplicableOffers:any[] = [];
  discountedAmount: number = 0;
  cashbackAmount: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: PaymentServiceService
  ) {

  }

  ngOnInit(): void {
    this.initiateForm();
    this.getUsers();
    this.calculateDiscountedAmount();
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
      console.log(this.userForm.value.amount);
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
    console.log(`its me ${this.userForm.value.amount}`);
    this.service.getAllOffers(this.userForm.value.amount).subscribe((applicableOffers: any) =>
    
    applicableOffers.forEach((element: any) => {
      this.cashbackAmount = applicableOffers.cashbackAmount;
        if (!(this.added)) {
         this.applicableOffers.push(applicableOffers.applicableOffers);
         this.displayapplicableOffers = this.extractDisplayedApplicableOffers(this.applicableOffers)
        }
      })
    )
    this.added = true
  }

  private extractDisplayedApplicableOffers(applicableOffers: any[]): any[] {
    // Map and return only the required fields for display
    return applicableOffers.map((offer: any) => ({
      cashback_percentage: offer.cashback_percentage,
      valid_upto: offer.expiration_time,
      max_cashback_limit: offer.max_cashback_limit
    }));
  }

  calculateDiscountedAmount(){
    this.discountedAmount = this.userForm.value.amount - this.cashbackAmount
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
