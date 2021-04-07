import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oph-surgical-patient',
  templateUrl: './surgical-patient.component.html',
  styleUrls: ['./surgical-patient.component.scss']
})
export class SurgicalPatientComponent implements OnInit {
  @Input() patient: any[];
  slideshowDelay = 2000;
  constructor() { }

  ngOnInit() {
  }

}
