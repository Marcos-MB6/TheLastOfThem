import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  noticias : any[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.noticiasService.obtenerListaNoticias().subscribe({
      next: (data:any) => {
        console.log("Se han cargado las noticias");

        this.noticias = data.slice(0, 5);
      },
      error: (err) => console.log(err),
    });
  }
}
