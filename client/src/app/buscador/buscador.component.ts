import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../_services/noticias.service';
import { AnimalesService } from '../_services/animales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  reinos = ['ANIMALIA', 'PLANTAE', 'FUNGI', 'CHROMISTA'];
  redlist = [
    'Extinct',
    'Extinct in the Wild',
    'Critically Endangered',
    'Endangered',
    'Vulnerable',
    'Lower Risk',
    'Near Threatened',
    'Least Concern',
  ];
  continentes = [
    'Europe',
    'Africa',
    'Asia',
    'North America',
    'South America',
    'Oceania',
    'Antartic',
  ];

  filtrosBusqueda: any = {
    NombreBusqueda: '',
    Reinos: {},
    Redlist: {},
    Continentes: {},
  };

  constructor(
    private router: Router,
    private animalesService: AnimalesService,
  ) {}

  ngOnInit(): void {}

  onSearch() {
    const filtrosBusqueda2 = {
      NombreBusqueda: this.filtrosBusqueda.NombreBusqueda,
      Reinos: Object.keys(this.filtrosBusqueda.Reinos).filter(
        (x) => this.filtrosBusqueda.Reinos[x],
      ),
      Redlist: Object.keys(this.filtrosBusqueda.Redlist).filter(
        (x) => this.filtrosBusqueda.Redlist[x],
      ),
      Continentes: Object.keys(this.filtrosBusqueda.Continentes).filter(
        (x) => this.filtrosBusqueda.Continentes[x],
      ),
    };

    this.router.navigate(['/animals'], { queryParams: filtrosBusqueda2 });

  }
}
