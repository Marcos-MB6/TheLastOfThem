import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  constructor(private http: HttpClient) {}

  obtenerListaNoticias() {
    return this.http.get<any[]>('http://localhost:5093/api/Noticia');
  }
}
