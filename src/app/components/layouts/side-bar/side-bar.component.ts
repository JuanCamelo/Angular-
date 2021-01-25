import { Component, OnInit } from '@angular/core';
import { List, MainSearch } from 'src/app/models/patient-search.interface';

@Component({
  selector: 'oph-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  hardodedObjects: any[] = [
    {
      id: 0,
      name: 'Oncología'
    },
    {
      id: 2,
      name: 'Oncología'
    },
    {
      id: 3,
      name: 'Oncología'
    },
    {
      id: 4,
      name: 'Oncología'
    },
  ]

  navigation: List[] = [
    { id: 1, text: "Especialidad" },
    { id: 2, text: "Busqueda por Paciente" },
    { id: 3, text: "Busqueda por Fecha" },
  ];;
  isSideBarCollapsed: boolean = true

  constructor() { }

  ngOnInit(): void { }

  onCollapseIconClicked = () => {
    this.isSideBarCollapsed = !this.isSideBarCollapsed
  }

}
