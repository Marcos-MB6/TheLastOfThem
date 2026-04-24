import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalesService {
  constructor(private http: HttpClient) {}

  private currentBusquedaSource = new BehaviorSubject<any[] | null>(null);
  currentBusqueda$ = this.currentBusquedaSource.asObservable();

  obtenerListaAnimales() {
    return this.http.get<any[]>('http://localhost:5093/api/Animal');
  }

  obtenerAnimalId(id : any) {
    return this.http.get<any>('http://localhost:5093/api/Animal/animal/'+ id);
  }

  obtenerListaAnimalesFiltrada(filtros: any) {
    let params = new HttpParams();

    if (filtros.NombreBusqueda) {
      params = params.set('NombreBusqueda', filtros.NombreBusqueda);
    }

    if (filtros.Reinos && filtros.Reinos.length > 0) {
      filtros.Reinos.forEach((reino: string) => {
        params = params.append('Reinos', reino);
      });
    }

    if (filtros.Redlist && filtros.Redlist.length > 0) {
      filtros.Redlist.forEach((r: string) => {
        params = params.append('Redlist', r);
      });
    }

    if (filtros.Continentes && filtros.Continentes.length > 0) {
      filtros.Continentes.forEach((cont: string) => {
        params = params.append('Continentes', cont);
      });
    }

    return this.http
      .get<any[]>('http://localhost:5093/api/Animal/filtros', {
        params: params,
      })
      .pipe(
        tap((busqueda) => {
          if (busqueda) {
            this.setCurrentBusqueda(busqueda);
          }
        }),
      );
  }

  setCurrentBusqueda(busqueda: any[]) {
    localStorage.setItem('busqueda', JSON.stringify(busqueda));
    this.currentBusquedaSource.next(busqueda);
  }
}
