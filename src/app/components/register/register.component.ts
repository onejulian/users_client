import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models';
import { AuthService } from 'src/app/services';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 

  registerForm: FormGroup = {} as FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      birthdate: ['', Validators.required],
    },
    {
      validator: this.passwordMatchValidator
    }
    );
  }

  register(): void {
    if (this.registerForm.valid) {
      let user: Register = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        password_confirmation: this.registerForm.value.password_confirmation,
        address: this.registerForm.value.address,
        city: this.registerForm.value.city,
        birthdate: this.registerForm.value.birthdate,
      };
      this.authService.register(user).subscribe(
        () => {
        }
      );
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');
  
    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  }

}
