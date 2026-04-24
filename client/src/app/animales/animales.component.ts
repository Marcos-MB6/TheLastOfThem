import { Component, OnInit } from '@angular/core';
import { AnimalesService } from '../_services/animales.service';
import { ActivatedRoute } from '@angular/router';
import { DialogFichaAnimalComponent } from '../dialog-ficha-animal/dialog-ficha-animal.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.scss'],
})
export class AnimalesComponent implements OnInit {
  animales: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private animalesService: AnimalesService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const filtrosBusqueda = {
        NombreBusqueda: params.get('NombreBusqueda') || '',
        Reinos: params.getAll('Reinos'),
        Redlist: params.getAll('Redlist'),
        Continentes: params.getAll('Continentes'),
      };

      this.animalesService
        .obtenerListaAnimalesFiltrada(filtrosBusqueda)
        .subscribe({
          next: (data) => {
            this.animales = data;
            console.log('Animales recibidos de la API:', this.animales);
          },
          error: (err) => console.error('Error al traer animales:', err),
        });
    });
  }

  openDialogAnimal(animalSeleccionado : any): void {
    console.log("Se ha abierto la ficha del animal")

    const dialogRef = this.dialog.open(DialogFichaAnimalComponent, {
      width: '2200px',
      height: '900px',
      data: animalSeleccionado
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Se ha cerrado la ficha del animal');
    });
  }
}
