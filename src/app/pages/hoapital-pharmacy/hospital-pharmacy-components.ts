import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oph-hospital-pharmacy',
  templateUrl: './hospital-pharmacy.components.html',
  styleUrls: ['./hospital-pharmacy.components.scss']
})
export class HospitalPharmacyComponent implements OnInit {
  routesList = [    
    { name: 'Dispensación', path: 'dispensacion', icon: '' }   
    
  ]

  constructor(
  ) { }

  ngOnInit() {
  }

}