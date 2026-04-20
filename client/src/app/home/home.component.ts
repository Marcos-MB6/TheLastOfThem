import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../_services/noticias.service';
import { AnimalesService } from '../_services/animales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  reinos = ['Animalia', 'Plantae', 'Fungi', 'Chromista'];
  redlist = [
    'Extinct',
    'Extinct in the wild',
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

  noticias: any[] = [];

  filtrosBusqueda: any = {};

  constructor(
    private noticiasService: NoticiasService,
    private animalesService: AnimalesService,
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.noticiasService.obtenerListaNoticias().subscribe({
      next: (data: any) => {
        console.log('Se han cargado las noticias');

        this.noticias = data.slice(0, 5);
      },
      error: (err) => console.log(err),
    });
  }

  onSearch() {
    this.animalesService
      .obtenerListaAnimalesFiltrada(this.filtrosBusqueda)
      .subscribe({
        next: () => {
          console.log('Se ha obtenido la lista de animales');
        },
        error: (err) => console.log(err),
      });
  }
}
