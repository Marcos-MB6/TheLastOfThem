import { Component, inject, OnInit } from '@angular/core';
import { AnimalesService } from '../_services/animales.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ficha-animal',
  templateUrl: './dialog-ficha-animal.component.html',
  styleUrls: ['./dialog-ficha-animal.component.scss'],
})
export class DialogFichaAnimalComponent implements OnInit {
  constructor(private animalesSerVice: AnimalesService) {}

  data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {

    const idDelAnimal = this.data.id;

    this.animalesSerVice
      .obtenerAnimalId(idDelAnimal)
      .subscribe({
        next: (resultado) => {
          console.log(resultado);
        },
        error: (err) => console.error('Error al obtener productos:', err),
      });
  }
}
