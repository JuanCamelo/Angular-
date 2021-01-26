import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine';

@Component({
  selector: 'oph-medicine-administration',
  templateUrl: './medicine-administration.component.html',
  styleUrls: ['./medicine-administration.component.scss']
})
export class MedicineAdministrationComponent implements OnInit {

  medicine: Medicine;

  constructor() {
  }

  ngOnInit() {
  }



}
