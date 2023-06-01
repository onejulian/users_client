import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterDetail } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = 'http://users-api.eastus.cloudapp.azure.com/api/';

  constructor(
    private http: HttpClient,
  ) { }

  getCharacters(page: number): Observable<CharacterDetail[]> {
    return this.http.get<CharacterDetail[]>(this.baseUrl + 'characters/page/' + page);
  }

  getCharacter(id: number): Observable<CharacterDetail> {
    return this.http.get<CharacterDetail>(this.baseUrl + 'characters/' + id);
  }
}
