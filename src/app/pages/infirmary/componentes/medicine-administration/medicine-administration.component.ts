import { Component, OnInit } from '@angular/core';
import { MedicalAdministrationDTO } from '../../models/MedicalAdministrationDTO';

@Component({
  selector: 'oph-medicine-administration',
  templateUrl: './medicine-administration.component.html',
  styleUrls: ['./medicine-administration.component.scss']
})
export class MedicineAdministrationComponent implements OnInit {

  medicine: MedicalAdministrationDTO;

  constructor() {
  }

  ngOnInit() {
  }



}
