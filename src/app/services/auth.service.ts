import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Login,
  Register,
  LoginResponse,
  RegisterResponse,
  LogoutResponse,
  api
} from '../models';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = api;
  private _user: LoginResponse = {} as LoginResponse;

  private loginUrl = this.baseUrl + 'login';
  private registerUrl = this.baseUrl + 'register';
  private logoutUrl = this.baseUrl + 'logout';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  set user(user: LoginResponse) {
    this._user = user;
  }

  get user(): LoginResponse {
    return this._user;
  }

  isAutehnticated(): boolean {
    return !!this._user;
  }

  login(user: Login): Observable<LoginResponse> {
    this.showLoading();
    return this.http.post<LoginResponse>(this.loginUrl, user).pipe(
      map((response: LoginResponse) => {
        return response;
      })
    );
  }

  register(user: Register): Observable<RegisterResponse> {
    this.showLoading();
    return this.http.post<RegisterResponse>(this.registerUrl, user).pipe(
      map((response: RegisterResponse) => {
        let loginData = {
          email: response.email,
          password: user.password
        };
        setTimeout(() => {
          this.login(loginData).subscribe(
            (response: LoginResponse) => {
              this.router.navigate(['/characters']);
            }
          );
        }, 2000);
        return response;
      }
      ));
  }

  logout(): Observable<LogoutResponse> {
    this.showLoading();
    return this.http.get<LogoutResponse>(this.logoutUrl).pipe(
      map((response: LogoutResponse) => {
        this.user = {} as LoginResponse;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigate(['/login']);
        Swal.close();
        return response;
      }));
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
