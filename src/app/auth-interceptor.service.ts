import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './services';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request?.url.endsWith('logout')) {
      let tokenData = localStorage.getItem('token')
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenData}`
        }
      });
    } else if (!request?.url.endsWith('login') && !request?.url.endsWith('register')) {
      let tokenData = localStorage.getItem('token')
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenData}`
        }
      });
    }
    return (next as any)
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error, request)
        ));
  }

  private handleError(err: any, req: any): any {
    if (err.status === 401) {
      this.router.navigate(['/login']);
      return throwError(() => err);
    }
    return throwError(() => err);
  }
}
