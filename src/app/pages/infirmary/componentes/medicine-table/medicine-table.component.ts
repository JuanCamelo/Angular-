import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { StylingService } from 'src/app/services/styling.service';
import { MedicalAdministrationDTO } from '../../models/MedicalAdministrationDTO';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'oph-medicine-table',
  templateUrl: './medicine-table.component.html',
  styleUrls: ['./medicine-table.component.scss']
})
export class MedicineTableComponent implements OnInit {

  @Output() dataMedicina: EventEmitter<MedicalAdministrationDTO> = new EventEmitter();

  gridId: string;
  dataSource: any;
  priority: any[];
  medicines: MedicalAdministrationDTO[];
  medicine: MedicalAdministrationDTO;

  editRowKey?: number = null;
  isLoading = false;
  loadPanelPosition = { of: '#gridContainer' };


  constructor(private medicineService: MedicineService,
              private sessionService: SessionService,
              private stylingService: StylingService) {
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

    this.medicineService.GetMedicalAdministration("CA59E04B-6878-4118-AF50-5D2112766C8B").subscribe(response => {
      this.medicines = response

      console.log(this.medicines);
    
    });
  }

  startEdit(e) {
    
    this.medicine = {
      IdDTO: e.data.id,
      IdNumeroOrdenMedicaDTO: e.data.ordenMedica,
      EstadoDTO: e.data.estado,
      FechaFormulaDTO: e.data.fechaFormula,
      FechaAplicacion: e.data.fechaAplicacion,
      HoraAplicacion: new Date(Date.now()),
      MedicamentoDTO: e.data.medicamento,
      ConcentracionDTO: e.data.concentracion,
      ConcentracionDescripcionDTO: e.data.concentracionDescripcionDTO,
      DosisDTO: e.data.dosisDTO,
      DosisDescripcionDTO: e.data.dosisDescripcionDTO,
      ViaAplicacionDTO: e.data.viaAplicacion,
      FrecuenciaDTO: e.data.frecuenciaDTO,
      FrecuenciaDescripcionDTO: e.data.frecuenciaDescripcionDTO,
      //fRhora: e.data.fRhora,
      CantidadDTO: e.data.cantidad,
      ObservacionDTO: e.data.observacion,
      ObservacionEjecucionDTO:'',
      UnidadInventarioAplicadaDTO:'',
      UnidadMedidaSuministroAdministradoDTO:'',
      UnidadPresentacionDTO:'',
      GoteroDTO:false,
      CantidadGotasDTO:'',
      IdPlanActividadesEnfermeriaDTO: e.data.idPlanActividadesEnfermeriaDTO
      //goteo: true,
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
