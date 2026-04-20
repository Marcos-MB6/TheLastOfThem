import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registroHecho = false;
  listaErrores: string[] | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  register() {
    this.userService.register(this.model).subscribe({
      next: () => {
        console.log('El usuario se ha registrado');
        this.registroHecho = true;

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Error recibido del backend:', err.error);

        this.listaErrores = []; //Non acumular errores

        if (err.error && err.error.errors) {
          const erroresBackend = err.error.errors;

          for (const campo in erroresBackend) {
            if (erroresBackend.hasOwnProperty(campo)) {
              this.listaErrores.push(...erroresBackend[campo]);
            }
          }
        }

      },
    });
  }
}
