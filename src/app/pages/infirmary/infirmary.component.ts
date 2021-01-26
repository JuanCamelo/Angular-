import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oph-infirmary',
  templateUrl: './infirmary.component.html',
  styleUrls: ['./infirmary.component.css']
})
export class InfirmaryComponent implements OnInit {

  routesList = [
    // { name: 'Programar Citas', path: 'citas-individuales', icon: '' },
    { name: 'Administración de medicamentos', path: 'administracion-medicamentos', icon: '' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
