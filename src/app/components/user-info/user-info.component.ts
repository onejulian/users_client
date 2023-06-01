import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: LoginData = {} as LoginData;
  loginForm: FormGroup = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      more_info: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUserInfo(): void {
    if (this.loginForm.valid) {
      this.showLoading();
      this.userService.updateUserInfo(this.loginForm.value.more_info).subscribe(
        (response: string) => {
          let user: LoginData = JSON.parse(localStorage.getItem('user') || '{}');
          localStorage.removeItem('user');
          user.more_info = this.loginForm.value.more_info
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
          // reset form
          this.loginForm = this.fb.group({
            more_info: ['', Validators.required]
          });
          Swal.close();
        }
      );
    }
  }

  showLoading(): void {
    Swal.fire({
      title: 'Loading',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

}
