import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UpdateMoreInfoRequest,
  api
} from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = api;

  private updateMoreInfo = this.baseUrl + 'user/update-more-info';

  constructor(
    private http: HttpClient,
  ) { }

  updateUserInfo(more_info: string): Observable<string> {
    let request: UpdateMoreInfoRequest = {
      more_info: more_info
    };
    return this.http.put<string>(this.updateMoreInfo, request).pipe(
      map((response: string) => {
        return response;
      })
    );
  }
}
