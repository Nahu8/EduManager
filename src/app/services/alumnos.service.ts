import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private storageKey = 'alumnosData';
  private jsonUrl = 'assets/dataAlumnos.json';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<any[]> {
    const alumnosFromLocalStorage = localStorage.getItem(this.storageKey);
    
    if (alumnosFromLocalStorage) {
      return of(JSON.parse(alumnosFromLocalStorage));
    } else {
      return this.http.get<any[]>(this.jsonUrl).pipe(
        tap((data) => localStorage.setItem(this.storageKey, JSON.stringify(data)))
      );
    }
  }

  agregarAlumno(nuevoAlumno: any): void {
    const alumnos = this.obtenerAlumnos();
    nuevoAlumno.id = alumnos.length > 0 ? Math.max(...alumnos.map((a) => a.id)) + 1 : 1;
    alumnos.push(nuevoAlumno);
    this.actualizarAlumnos(alumnos);
  }

  eliminarAlumno(id: number): void {
    const alumnos = this.obtenerAlumnos();
    const alumnosFiltrados = alumnos.filter((a) => a.id !== id);
    this.actualizarAlumnos(alumnosFiltrados);
  }

  editarAlumno(alumnoEditado: any): void {
    const alumnos = this.obtenerAlumnos();
    const index = alumnos.findIndex((a) => a.id === alumnoEditado.id);
    if (index !== -1) {
      alumnos[index] = alumnoEditado;
      this.actualizarAlumnos(alumnos);
    }
  }

  private obtenerAlumnos(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private actualizarAlumnos(alumnos: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(alumnos));
  }
}
