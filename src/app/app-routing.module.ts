import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './componentes/alumnos/alumnos.component';

const routes: Routes = [
  { path: 'alumnos', component: AlumnosComponent },
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
