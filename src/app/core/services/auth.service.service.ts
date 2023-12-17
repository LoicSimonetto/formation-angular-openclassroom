import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token!: string;

  constructor() { }

  getToken(): string {
    return this.token;
  }

  login(): void {
    this.token = 'MyFakeToken';
  }
}
