import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oph-appointment-management',
  templateUrl: './appointment-management.component.html',
  styleUrls: ['./appointment-management.component.css']
})
export class AppointmentManagementComponent implements OnInit {

  routesList = [
    // { name: 'Programar Citas', path: 'citas-individuales', icon: '' },
    { name: 'Gestionar Citas', path: 'appointment-management', icon: '' },
    { name: 'Programar citas', path: 'citas' },
    { name: 'Programar citas', path: 'citas-especiales', icon: '' },
    {name :'Consultar citas Junta Medica', path:'citas-junta-medica', icon: ''},
    { name: 'Historico Citas', path: 'historico-citas', icon: '' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
