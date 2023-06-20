import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { Login, LoginResponse } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = {} as FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    let tokenData = localStorage.getItem('token');
    if (tokenData) {
      let token = JSON.parse(tokenData);
      if (token.expirationDate > new Date().getTime()) {
        this.router.navigate(['/characters']);
      }
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      let user: Login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authService.login(user).subscribe(
        (response: LoginResponse) => {
          if (response.Token) {
            this.router.navigate(['/characters']);
          }
        }
      );
    }
  }

}
