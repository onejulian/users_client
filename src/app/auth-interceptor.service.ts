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

  errorsAllowed = ["el personaje ya existe", "personaje no encontrado"];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request?.url.endsWith('login') && !request?.url.endsWith('register')) {
      let tokenData = localStorage.getItem('token');
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
    if (err.status !== 200 && err.status !== 201) {
      const textErr = err.error.error;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: textErr
      })
      if (!this.errorsAllowed.includes(textErr)) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
      return throwError(() => err);
    }
    return throwError(() => err);
  }
}
