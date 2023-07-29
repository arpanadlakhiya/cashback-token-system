import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    // private userService: UserService
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
}

// onSubmit() {
//   if (this.registrationForm.valid) {
//     const userData = this.registrationForm.value;
//     this.userService.registerUser(userData).subscribe(
//       (response) => {
//         // Handle successful registration
//         console.log('User registered successfully!', response);
//         // You can redirect the user to a login page or perform other actions as needed.
//       },
//       (error) => {
//         // Handle registration errors
//         console.error('Registration failed!', error);
//       }
//     );
//   }
// }
}


