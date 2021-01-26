import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Medicine } from '../../models/medicine';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'oph-medicine-table',
  templateUrl: './medicine-table.component.html',
  styleUrls: ['./medicine-table.component.scss']
})
export class MedicineTableComponent implements OnInit {

  @Output() dataMedicina: EventEmitter<Medicine> = new EventEmitter();

  dataSource: any;
  priority: any[];
  medicines: Medicine[];
  medicine: Medicine;

  editRowKey?: number = null;
  isLoading = false;
  loadPanelPosition = { of: '#gridContainer' };


  constructor(private medicineService: MedicineService) {
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'id',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'sel',
        'ordenMedica',
        'estado',
        'fechaFormula',
        'medicamento',
        'concentracion',
        'dosis',
        'viaAplicacion',
        'fRhora',
        'cantidad',
        'observacion'
      ]
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
  }

  ngOnInit() {
    this.medicines = this.medicineService.getMedicines();
  }

  startEdit(e) {
    this.medicine = {
      ordenMedica: e.data.ordenMedica,
      estado: e.data.estado,
      fechaFormula: e.data.fechaFormula,
      fechaAplicacion: new Date(Date.now()),
      horaAplicacion: new Date(Date.now()),
      medicamento: e.data.medicamento,
      concentracion: e.data.concentracion,
      dosis: e.data.dosis,
      viaAplicacion: e.data.viaAplicacion,
      fRhora: e.data.fRhora,
      cantidad: e.data.cantidad,
      observacion: e.data.observacion,
      goteo: true,
    }
    this.dataMedicina.emit(this.medicine);
  }
  showModalCancel(e) {
    // this.idCita = e.row.data.idListaEspera
    // this.isVisibleCancel = true;
  }

}
