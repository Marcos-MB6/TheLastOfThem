import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../_services/noticias.service';
import { AnimalesService } from '../_services/animales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // reinos = ['ANIMALIA', 'PLANTAE', 'FUNGI', 'CHROMISTA'];
  // redlist = [
  //   'Extinct',
  //   'Extinct in the wild',
  //   'Critically Endangered',
  //   'Endangered',
  //   'Vulnerable',
  //   'Lower Risk',
  //   'Near Threatened',
  //   'Least Concern',
  // ];
  // continentes = [
  //   'Europe',
  //   'Africa',
  //   'Asia',
  //   'North America',
  //   'South America',
  //   'Oceania',
  //   'Antartic',
  // ];

  noticias: any[] = [];

  // filtrosBusqueda: any = {
  //   NombreBusqueda: '',
  //   Reinos: {},
  //   Redlist: {},
  //   Continentes: {}
  // };

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

  // onSearch() {
  //   const filtrosBusqueda2 ={

  //     NombreBusqueda: this.filtrosBusqueda.NombreBusqueda,
  //     Reinos: Object.keys(this.filtrosBusqueda.Reinos).filter(x => this.filtrosBusqueda.Reinos[x]),
  //     Redlist: Object.keys(this.filtrosBusqueda.Redlist).filter(x => this.filtrosBusqueda.Redlist[x]),
  //     Continentes: Object.keys(this.filtrosBusqueda.Continentes).filter(x => this.filtrosBusqueda.Continentes[x])
  //   }

  //   this.animalesService.obtenerListaAnimalesFiltrada(filtrosBusqueda2).subscribe({
  //       next: (data: any) => {
  //         console.log('Se ha obtenido la lista de animales');
  //         console.log(filtrosBusqueda2);
  //         console.log(data);
  //       },
  //       error: (err) => console.log(err),
  //     });
  // }
}
