import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  alumnos: any[] = [];

  constructor(private alumnosService: AlumnosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  agregarAlumno(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { tipo: 'agregar', alumno: { id: null, nombre: '', edad: null, curso: '' } }
    });

    dialogRef.afterClosed().subscribe((nuevoAlumno) => {
      if (nuevoAlumno) {
        this.alumnosService.agregarAlumno(nuevoAlumno);
        this.cargarAlumnos();
      }
    });
  }

  editarAlumno(alumno: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { tipo: 'editar', alumno }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alumnosService.editarAlumno(result);
        this.cargarAlumnos();
      }
    });
  }

  eliminarAlumno(id: number): void {
    const alumno = this.alumnos.find((a) => a.id === id);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { tipo: 'eliminar', alumno }
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.alumnosService.eliminarAlumno(id);
        this.cargarAlumnos();
      }
    });
  }
}
