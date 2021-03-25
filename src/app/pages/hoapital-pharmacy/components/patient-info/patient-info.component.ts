import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'oph-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  @Input() patient: any[];

  //patient: InfoPatientDTO = new InfoPatientDTO();
  slideshowDelay = 2000;
  constructor( ) { }

    //pruebas
    diagnosticoDTO= "almacenar el estado de cada elemento por separado. (Mueva el controlador de clic y whenClicked al objeto objeto.) Algo a lo largo de estas líneas"
    prevencionDTO = ""//"Esto es porque el whenClicked La variable es compartida por todos los elementos en la lista. Es necesario almacenar el estado de cada elemento por separado. (Mueva el controlador de clic y whenClicked al objeto objeto.) Algo a lo largo de estas líneas"
    planDTO="Esto es porque el whenClicked La variable es compartida por todos los elementos en la lista. Es necesario almacenar el estado de cada elemento por separado. (Mueva el controlador de clic y whenClicked al objeto objeto.) Algo a lo largo de estas líneas"


  ngOnInit() {
  }

}
