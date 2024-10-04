import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  erreur: number= 0;

  user = new User();


  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
/*
  onLoggedin()
    {
      console.log(this.user);
      let isValidUser: Boolean = this.authService.SignIn(this.user);
      if (isValidUser)
          this.router.navigate(['/']);
      else
          //alert('Login ou mot de passe incorrecte!');
         this.erreur=1;

    }*/
    err:number = 0;
    onLoggedin() {
       this.authService.login(this.user).subscribe({ 
        next: (data) => { 
          let jwToken = data.headers.get('Authorization')!;
         this.authService.saveToken(jwToken); this.router.navigate(['/']); },
          error: (err: any) => { this.err = 1; } });
       }

          saveToken(token: string): void {
            localStorage.setItem('jwtToken', token);
          }
        
          getToken(): string | null {
            return localStorage.getItem('jwtToken');
          }
}