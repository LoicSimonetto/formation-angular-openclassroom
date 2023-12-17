import { Component } from '@angular/core';
import { AuthServiceService } from '../../../core/services/auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor(private auth: AuthServiceService,
              private router: Router){}

  onLogin(): void{
    this.auth.login();
    this.router.navigateByUrl('/facesnaps');
  }
}
