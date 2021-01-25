import { Injectable } from '@angular/core';

export class List {
  id: number;
  text: string;
}


let navigation: List[] = [
  { id: 1, text: "Especialidad" },
  { id: 2, text: "Busqueda por Paciente" },
  { id: 3, text: "Busqueda por Fecha" },
];


@Injectable()
export class MainSearch {
  getNavigationList(): List[] {
    return navigation;
  }
}
