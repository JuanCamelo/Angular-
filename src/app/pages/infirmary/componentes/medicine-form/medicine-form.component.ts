import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine';

@Component({
  selector: 'oph-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent implements OnInit {
  @Input() medicine: Medicine = {
    ordenMedica: null,
    estado: '',
    fechaFormula: null,
    fechaAplicacion: new Date(Date.now()),
    horaAplicacion: new Date(Date.now()),
    medicamento: '',
    concentracion: '',
    dosis: '',
    viaAplicacion: '',
    fRhora: '',
    cantidad: null,
    observacion: '',
    goteo: true
  };
  currentDate = new Date(Date.now());
  unidadesDeMedida = ['Ampolla', 'Tableta','Frasco','Caja','Otro'];
  priorities: string[] = ['Botiquin', 'Farmacia', 'Dispensación automatica'];
  constructor() {
  }

  ngOnInit() {
  }
  
  limpiar() {
    console.log('Limpar')
  }
}
