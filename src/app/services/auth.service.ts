import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  loginSuccessHandler({
    token,
    username,
  }: {
    token: string;
    username: string;
  }): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    return token != null && username != null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.router.navigate(['/']);
  }
}
