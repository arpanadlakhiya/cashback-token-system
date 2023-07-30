import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from 'src/app/service/register-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RegisterUserService
    ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {

  }

  forgot(){
    console.log("yashu");
    
    this.router.navigate(['auth/forgot-password'])
  }

  onSubmit() {
    console.log("yashdu",this.myForm.valid);
    
    if (this.myForm.valid) {
      // Form is valid, perform necessary actions
      this.router.navigate(['dashboard'])

    } else {
      // Form is invalid, display error messages if needed
    }
  }
  openPayment(){
    this.router.navigate(['/paymentdashboard']);
  }

  register() {
    console.log("HELLO I AM BEING HITTT")
    if (this.myForm.valid) {
      console.log("HELLO I AM BEING HITTT part 2")
      const userData = this.myForm.value;
      this.service.loginUser(userData).subscribe(
        (response) => {
          console.log('User logged in successfully!', response);
          this.router.navigate(['/paymentdashboard'])
        },
        (error) => {
          console.error('Login failed!', error);
        }
      );
    }
  }
}
