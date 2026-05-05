import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Route, Router } from '@angular/router';
import { AnimalesService } from '../_services/animales.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  animalSeleccionado: any;
  nombreComun: string = '';
  nombreCientifico: string = '';
  reinoAnimal: string = '';
  readOnly: boolean = false;

  //Esto añade a lista de opcións en cada input para axudar ao usuario
  reinosDisponibles = ['Animalia', 'Plantae', 'Fungi', 'Chromista'];
  nombresComunesDisponibles: string[] = [];
  nombresCientificosDisponibles: string[] = [];

  constructor(
    public userService: UserService,
    public router: Router,
    public animalesService: AnimalesService,
  ) {}

  ngOnInit(): void {
    this.userService.currrentUser$.subscribe((usuario) => {
      if (!usuario) {
        this.router.navigate(['/']);
      }
    });

    this.obtenerNombresAnimales();
    this.obtenerAnimal();
  }

  obtenerAnimal(): void {
    this.animalesService.obtenerAnimalDiario().subscribe({
      next: (data) => {
        this.animalSeleccionado = data;
      },
    });
  }

  obtenerNombresAnimales(): void {
    this.animalesService.obtenerListaNombresCientificos().subscribe({
      next: (cien) => {
        this.nombresCientificosDisponibles = cien;
        console.log(this.nombresCientificosDisponibles);
      },
    });

    this.animalesService.obtenerListaNombresComunes().subscribe({
      next: (com) => {
        this.nombresComunesDisponibles = com;
        console.log(this.nombresComunesDisponibles);
      },
    });
  }

  comprobarRespuesta(): void {
    if (
      this.nombreComun.toLowerCase() ==
      this.animalSeleccionado.nombreComun.toLowerCase()
    ) {
      document.getElementById('commonName')?.classList.remove('fallo');
      document.getElementById('commonName')?.classList.add('acierto');

      this.readOnly = true;
    } else {
      document.getElementById('commonName')?.classList.add('fallo');

       
    }

    if (
      this.nombreCientifico.toLowerCase() ==
      this.animalSeleccionado.nombreCientifico.toLowerCase()
    ) {
      document.getElementById('scientificName')?.classList.remove('fallo');
      document.getElementById('scientificName')?.classList.add('acierto');

      this.readOnly = true;
    } else {
      document.getElementById('scientificName')?.classList.add('fallo');
    }

    if (
      this.reinoAnimal.toLowerCase() ==
      this.animalSeleccionado.reino.toLowerCase()
    ) {
      document.getElementById('animalKingdom')?.classList.remove('fallo');
      document.getElementById('animalKingdom')?.classList.add('acierto');

      this.readOnly = true;
    } else {
      document.getElementById('animalKingdom')?.classList.add('fallo');
    }
  }
}
