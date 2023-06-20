import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Characters, Character } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = "https://rickandmortyapi.com/api/character";

  constructor(
    private http: HttpClient,
  ) { }

  getCharacters(page: number): Observable<Characters> {
    return this.http.get<Characters>(this.baseUrl + '?page=' + page);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(this.baseUrl + '/' + id);
  }
}
