import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn = false;
  errorLogin: string | null = null;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.errorLogin = null;

    this.userService.login(this.model).subscribe({
      next: () => {
        console.log('El usuario se ha logueado');
        this.loggedIn = true;
      },
      error: (err) => {
        this.errorLogin = 'Usuario o contraseña incorrectos';

        setTimeout(() => (this.errorLogin = null), 3000);
      },
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/']);
  }
}
