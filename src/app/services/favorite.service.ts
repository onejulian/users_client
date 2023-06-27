import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Favorite,
  DeleteFavoriteResponse,
} from '../models';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = env.api;

  constructor(
    private http: HttpClient,
  ) { }

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.baseUrl + 'characters');
  }

  addFavorite(id: string): Observable<Favorite> {
    return this.http.post<Favorite>(this.baseUrl + 'characters?id=' + id, {});
  }

  deleteFavorite(id: string): Observable<DeleteFavoriteResponse> {
    return this.http.delete<DeleteFavoriteResponse>(this.baseUrl + 'characters?id=' + id);
  }
}
