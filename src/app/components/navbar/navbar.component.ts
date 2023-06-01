import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn: boolean = false;
  isInLoginPage: boolean = false;
  isInRegisterPage: boolean = false;
  isInUserInfoPage: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.isInLoginPage = this.router.url.includes('login') || this.router.url === '/';
      this.isInRegisterPage = this.router.url.includes('register') || this.router.url === '/';
      this.loggedIn = this.router.url.includes('characters') || this.router.url.includes('user-info');
      this.isInUserInfoPage = this.router.url.includes('user-info');
    });
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.loggedIn = false;
    this.authService.logout().subscribe();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  info_user(): void {
    this.router.navigate(['/user-info']);
  }

  characters(): void {
    this.router.navigate(['/characters']);
  }
}
