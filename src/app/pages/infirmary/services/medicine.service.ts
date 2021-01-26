import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor() { }

  medicine: Medicine[] = [{
    id: 1,
    ordenMedica: 100,
    estado: 'Nuevo',
    fechaFormula: new Date(Date.now()),
    medicamento: 'Asetaminofen',
    concentracion: '40 miligramos',
    dosis: '40 mg',
    viaAplicacion: 'Endovenosa',
    fRhora: '6 horas',
    cantidad: 1000,
    observacion: 'Diluir en 10 cc de solucion salina 0.3%',
    fechaAplicacion: new Date(Date.now()),
  },
  {
    id: 2,
    ordenMedica: 56,
    estado: 'Nuevo',
    fechaFormula: new Date(Date.now()),
    medicamento: 'Opramosol',
    concentracion: '500 mg',
    dosis: '500 mg',
    viaAplicacion: 'Oral',
    fRhora: '6 horas',
    cantidad: 1000,
    observacion: '',
    fechaAplicacion: new Date(Date.now()),
  },
  {
    id: 3,
    ordenMedica: 80,
    estado: 'Nuevo',
    fechaFormula: new Date(Date.now()),
    medicamento: 'Endorcion',
    concentracion: '6 miligramos',
    dosis: '6 mg',
    viaAplicacion: 'Endorcion',
    fRhora: '12 horas',
    cantidad: 1000,
    observacion: 'Diluir en 10 cc de solucion salina 0.3%',
    fechaAplicacion: new Date(Date.now()),
  }]

  getMedicines() {
    return this.medicine;
  }
}
