import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimalesService {
  constructor(private http: HttpClient) {}

  obtenerListaAnimales() {
    return this.http.get<any[]>('http://localhost:5093/api/Animal');
  }

  obtenerListaAnimalesFiltrada(model : any) {
    return this.http.get<any[]>('http://localhost:5093/api/Animal/filtros', model);
  }
}
