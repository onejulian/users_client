import { Component, OnInit } from '@angular/core';
import {
  FavoriteService,
  AuthService,
  CharacterService
} from 'src/app/services';
import {
  Favorite,
  Character,
  // AddFavoriteRequest,
  // DeleteFavoriteRequest,
} from 'src/app/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  favorites: Favorite[] = [];
  currentFavorites: string[] = [];
  characters: Character[] = [];
  character: Character = {} as Character;
  pages = 42;
  current_page = 1;
  showModal = false;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private characterService: CharacterService
  ) { }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  ngOnInit(): void {
    this.showLoading();
    this.characterService.getCharacters(this.current_page).subscribe(characters => {
      this.characters = characters.results;
      Swal.close();
    });
    this.getFavorites();
  }

  loadData(page: number) {
    this.showLoading();
    this.current_page = page;
    this.characterService.getCharacters(this.current_page).subscribe(characters => {
      this.characters = characters.results;
    });
    this.getFavorites();
  }

  getCharacter(id: number): void {
    this.showLoading();
    this.characterService.getCharacter(id).subscribe(character => {
      this.character = character;
      Swal.close();
      this.toggleModal();
    });
  }

  getFavorites(): void {
    this.favoriteService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
      this.currentFavorites = this.favorites.map(favorite => favorite.id_character);
      Swal.close();
    });
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  addFavorite(id: number): void {
    this.currentFavorites.push(`${id}`);
    this.favoriteService.addFavorite(`${id}`).subscribe(() => {
      this.getFavorites();
    });
  }

  deleteFavorite(id: number): void {
    this.currentFavorites = this.currentFavorites.filter(favorite => favorite !== `${id}`);
    this.favoriteService.deleteFavorite(`${id}`).subscribe(() => {
      this.getFavorites();
    });
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

  isFavorite(id: number): boolean {
    return this.currentFavorites.includes(`${id}`);
  }

}
