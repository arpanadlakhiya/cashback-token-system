import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from 'src/app/service/register-user.service';
// import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit{
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: RegisterUserService,
    private router : Router
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
}

register() {
  console.log("HELLO I AM BEING HITTT")
  if (this.registrationForm.valid) {
    console.log("HELLO I AM BEING HITTT: valid")
    const userData = this.registrationForm.value;
    this.userService.registerUser(userData).subscribe(
      (response) => {
        // Handle successful registration
        console.log('User registered successfully!', response);
        this.router.navigate(['/login'])
        // You can redirect the user to a login page or perform other actions as needed.
      },
      (error) => {
        // Handle registration errors
        console.error('Registration failed!', error);
      }
    );
  }
}

}


