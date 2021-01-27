import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { StylingService } from 'src/app/services/styling.service';
import { Medicine } from '../../models/medicine';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'oph-medicine-table',
  templateUrl: './medicine-table.component.html',
  styleUrls: ['./medicine-table.component.scss']
})
export class MedicineTableComponent implements OnInit {

  @Output() dataMedicina: EventEmitter<Medicine> = new EventEmitter();

  gridId: string;
  dataSource: any;
  priority: any[];
  medicines: Medicine[];
  medicine: Medicine;

  editRowKey?: number = null;
  isLoading = false;
  loadPanelPosition = { of: '#gridContainer' };


  constructor(private medicineService: MedicineService,
    private sessionService: SessionService,
    private stylingService: StylingService,) {
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'id',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
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
    this.gridId = this.medicineService.generateUuid();
    this.medicines = this.medicineService.getMedicines();
  }

  startEdit(e) {
    this.medicine = {
      id: e.data.id,
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

  onContentReady(e: any) {
    if (this.sessionService.session) {
      setTimeout(() => {
        const gridEl = document.getElementById(this.gridId);
        if (gridEl && this.sessionService.session.selectedCompany.theme !== null) {
          this.stylingService.setGridHeaderColorStyle(gridEl, this.sessionService.session.selectedCompany.theme);
          this.stylingService.setGridHeaderTextColorStyle(gridEl, this.sessionService.session.selectedCompany.theme);
        }
      }, 1);
    }
  }

}
