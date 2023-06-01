import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Favorite, 
  AddFavoriteResponse,
  DeleteFavoriteResponse,
  AddFavoriteRequest,
  DeleteFavoriteRequest
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'https://users-api.eastus.cloudapp.azure.com/api/';

  constructor(
    private http: HttpClient,
  ) { }

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.baseUrl + 'favorites');
  }

  addFavorite(request: AddFavoriteRequest): Observable<AddFavoriteResponse> {
    return this.http.post<AddFavoriteResponse>(this.baseUrl + 'favorites', request);
  }

  deleteFavorite(request: DeleteFavoriteRequest): Observable<DeleteFavoriteResponse> {
    return this.http.delete<DeleteFavoriteResponse>(this.baseUrl + 'favorites', { params: request as any });
  }
}
