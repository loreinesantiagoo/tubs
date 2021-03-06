import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { PasswordValidation } from '../../validation/password-match';
import { User, Roles } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  PASSWORD_PATTERN = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;

  roles: Roles;

  constructor(private authSvc: AuthService,
    private fb: FormBuilder,
    private snackSvc: MatSnackBar,
    private router: Router) {
    this.registrationForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]],
      confirmPassword: ['', [Validators.required]],
      fullName: ['', Validators.required]
    }, {
        validator: [PasswordValidation.MatchPassword]
      });
  }

  ngOnInit() {
  }
  onSubmit() {
    const confirmPassword = this.registrationForm.get('confirmPassword').value;
    const email = this.registrationForm.get('email').value;
    const fullName = this.registrationForm.get('fullName').value;

    const registerUser: User = {
      email: email,
      password: confirmPassword,
      displayName: fullName,
      roles: this.roles
    };
    /// first hash to the server side
    if (this.registrationForm.valid) {
      this.authSvc.signUp(registerUser).subscribe((result) => {
        // console.log(result);
        const snackBarRef = this.snackSvc.open('Registration Successful!', 'Done', {
          duration: 3000
        });
      });
    } else {
      const snackBarRef = this.snackSvc.open('Invalid !', 'Done', {
        duration: 3000
      });
    }
    this.registrationForm.reset();
    this.router.navigate(['/login']);
  }
}
