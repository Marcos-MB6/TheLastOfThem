import { Component, inject, OnInit } from '@angular/core';
import { AnimalesService } from '../_services/animales.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-ficha-animal',
  templateUrl: './dialog-ficha-animal.component.html',
  styleUrls: ['./dialog-ficha-animal.component.scss'],
})
export class DialogFichaAnimalComponent implements OnInit {
  private map: L.Map | undefined;
  paisesDestacados: string[] = [];

  constructor(
    private animalesSerVice: AnimalesService,
    private http: HttpClient,
  ) {}

  data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    const idDelAnimal = this.data.id;

    this.animalesSerVice.obtenerAnimalId(idDelAnimal).subscribe({
      next: (resultado) => {
        console.log(resultado.paises);
        this.paisesDestacados = resultado.paises.split(',').map((pais: string) => pais.trim());

        this.iniciarMapa();
      },
      error: (err) => console.error('Error al obtener productos:', err),
    });
  }

  iniciarMapa(): void {
    this.map = L.map('mi_mapa').setView([20, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.http.get('assets/countries.geo.json').subscribe((geoJsonData: any) => {
      L.geoJSON(geoJsonData, {
        style: (feature) => {

          const nombrePais = feature?.properties?.name;

          const pintarPais = this.paisesDestacados.includes(nombrePais);

          return {
            fillColor: pintarPais ? '#ff0000' : 'transparent',
            weight: pintarPais ? 1 : 0,
            opacity: 1,
            color: 'black',
            fillOpacity: pintarPais ? 0.5 : 0,
          };
        },
      }).addTo(this.map!);
    });

  }
}
