import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicalAdministrationDTO } from '../../models/MedicalAdministrationDTO';
import { confirm, custom } from "devextreme/ui/dialog";
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'oph-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent {

  UnidadPresentacionList = [];


  @Output() dataMedicina: EventEmitter<MedicalAdministrationDTO> = new EventEmitter();

  @Input() medicine: MedicalAdministrationDTO = {
    IdDTO: null,
    IdNumeroOrdenMedicaDTO: null,
    EstadoDTO: '',
    FechaFormulaDTO: null,
    FechaAplicacion: new Date(Date.now()),
    HoraAplicacion: new Date(Date.now()),
    MedicamentoDTO: '',
    ConcentracionDTO: '',
    ConcentracionDescripcionDTO:'',
    DosisDTO: '',
    DosisDescripcionDTO: '',
    ViaAplicacionDTO: '',
    FrecuenciaDTO:'',
    FrecuenciaDescripcionDTO:'',
    //fRhora: '',
    CantidadDTO: null,
    ObservacionDTO: '',
    ObservacionEjecucionDTO: '',
    UnidadInventarioAplicadaDTO: '',
    UnidadMedidaSuministroAdministradoDTO:'',
    UnidadPresentacionDTO:'',
    GoteroDTO: false,
    CantidadGotasDTO:''
  };
  currentDate = new Date(Date.now());
  unidadesDeMedida = ['Ampolla', 'Tableta','Frasco','Caja','Otro'];
  priorities: string[] = ['Botiquin', 'Farmacia', 'Dispensación automatica'];
  value: any[] = [];


  constructor(private medicineService: MedicineService) {
  }

  ngOnInit(): void {

    this.medicineService.GetPresentacionSuministro().subscribe(response => {
      this.UnidadPresentacionList = response;
    });

  }

  saveMedicalAdministration(e) {

    e.preventDefault();

    const result = confirm(
      "¿Está seguro de guardar?", "Remisión"
    );

    result.then((dialogResult) => {
      if (!dialogResult) {
        return;
      }
      else {

        this.medicineService.SaveMedicalAdministration(this.medicine).subscribe(response => {
          this.dataMedicina = response    
          console.log(this.dataMedicina);        
        });

      }
    });

  }

  /*SwitchGotero = {
    switchedOffText: 'NO',
    switchedOnText: 'SI',
    onValueChanged: (e: any) => {
      this.medicine.GoteroDTO = (e.value);
    }
  }*/
  
  limpiar() {
    this.medicine = new MedicalAdministrationDTO;
    this.dataMedicina.emit(null);
  }
}
