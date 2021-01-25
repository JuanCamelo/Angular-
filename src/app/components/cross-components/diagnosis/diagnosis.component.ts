import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ContextMenuItem } from 'src/app/models/context-menu-item';
import { EnumsBadgets } from 'src/app/enums/example.enum';
import { iconBarItem } from 'src/app/models/icon-bar';
import { environment } from 'src/environments/environment';
import { DiagnosisDTO, DiagnosisRegisterDTO, DiagnosisTypeDTO, PYDProgramDTO } from '../models/cross-components-models';
import { AmbulatoryMedicalRecordService } from 'src/app/pages/ambulatory-medical-record/services/ambulatory-medical-record.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DxSelectBoxComponent, DxFormComponent } from 'devextreme-angular';
import { RequestResult } from 'src/app/models/request-result';
import { interval } from 'rxjs';
import { cloneDeep } from 'lodash'


import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as reduxActions from '../../../../app/store/actions';
import { RecognitionVoiceService } from 'src/app/utils/recognitionVoice';

@Component({
  selector: 'oph-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  @ViewChild("selectbox") selectBox: DxSelectBoxComponent;
  @ViewChild('form') form: DxFormComponent;

  private timeoutCounter = null;

  itemsFiltered: any;

  accordionItems = [
    {

    }
  ]

  titles = ["Diagnostico", "Recomendaciones Generales"]

  diagnosisList: DiagnosisDTO[] = []
  
  //storeArr keeps the elements we send to the redux store
  storeArr = [];


  gridData: any[] = []

  dataForm = {
    TipoDiagRegistroMedico: null,
    Diagnostico: null,
    DiagnosticoPrincipal: "",
    InscribirPrograma: false,
    ObservacionEspecificacion: "",
    Programa: null
  }

  diagnosisTypeList: DiagnosisTypeDTO[] = [];

  diagnosisCheckBoxes = [
    { text: 'Diagnóstico Principal', value: true },
    { text: 'Diagnóstico Asociado', value: false },
  ]

  programList: PYDProgramDTO[] = [];

  helpersList = [
    {
      Id: "1",
      Name: "Hipertensión Arterial"
    },
    {
      Id: "2",
      Name: "Diabetes"
    },
    {
      Id: "3",
      Name: "Dislipidemia"
    },
    {
      Id: "4",
      Name: "Enfermedad Cerebrovascular"
    },
    {
      Id: "5",
      Name: "Accidente Cerebrovascular"
    }
  ]

  descriptionButton = [
    {
      name: 'voice',
      options: {
        icon: 'dx-icon fas fa-microphone-alt oph-icon',
        type: 'normal',
        stylingMode: 'text',
        disabled: false,
        visible: true,
        onClick: (e: any) => this.getAudio('ObservacionEspecificacion')
      }
    }
  ]

  isSearching = false;

  withAnimationVisibleOne = false;
  URLDiagnosis = environment.URLDIAGNOSIS;
  selectBoxData;
  constructor(private medicalRecordService: AmbulatoryMedicalRecordService,
              private sharedService: SharedService,
              private store: Store<AppState>,
              private recognitionVoiceService: RecognitionVoiceService,) {
    this.itemsFiltered = this.diagnosisList;
  }

  ngOnInit(): void {
    this.loadSelectData();
  }

  loadSelectData() {
    this.medicalRecordService.GetAllDiagnosisTypes().subscribe((res: DiagnosisTypeDTO[]) => {
      this.diagnosisTypeList = res;
    })

    this.medicalRecordService.GetAllDiagnosisPrograms().subscribe((res: PYDProgramDTO[]) => {
      this.programList = res;
    })
  }

  getAudio(field: string) {
    this.recognitionVoiceService.listenVoice(this.dataForm[field]).subscribe(txt => this.dataForm[field] = txt)
  }

  clear() {
    this.form.instance.resetValues();
    this.selectBox.instance.reset();

  }

  onFilterKeyUp(e) {
    const value = this.selectBox.text;

    clearTimeout(this.timeoutCounter);

    //Se inicia contador de tiempo de 1 segundo, cuando termina, llama al servicio.
    //Si este método se vuelve a llamar, se hará un clearTimeout que impedirá el llamado de servicio en esta primera ejecución.
    this.timeoutCounter = setTimeout(() => {
      if (value.length > 2 && !this.isSearching) {
        this.medicalRecordService.GetDiagnosisByDescription(value).subscribe((res: RequestResult<DiagnosisDTO[]>) => {
          if (!res.isError && res.result != null) {
            this.diagnosisList = res.result;
          }
        })

      } else if (value.length == 0) {
        this.diagnosisList = [];
      }
    }, 1000);
  }

  onSearchInputChange(e) {
  }

  toggleWithAnimationOne() {
    this.withAnimationVisibleOne = !this.withAnimationVisibleOne;
  }

  selectDiagnosis(e) {
    this.dataForm.Diagnostico = e.selectedItem;
  }

  selectProgram(e) {
    this.dataForm.Programa = e.selectedItem;
  }

  selectDiagnosisType(e) {
    this.dataForm.TipoDiagRegistroMedico = e.selectedItem;
  }

  switchValueChanged(e) { }

  addDiagnosis(e) {
    e.preventDefault();
    this.gridData.push({ ...this.dataForm });
    
    if(this.dataForm.Diagnostico === null)
    {
      this.sharedService.warning('Busqueda por código o descripción no puede ir vacio')
      return;
    }
    const val = {
      ...this.dataForm,
      Diagnostico: this.dataForm.Diagnostico.idDTO,
      Programa: this.dataForm.Programa ? this.dataForm.Programa.idDTO : null,
      TipoDiagRegistroMedico: this.dataForm.TipoDiagRegistroMedico.idDTO
    }
    this.storeArr.push(val);
    //Deepclone para clonar valor sin la referencia del array.
    let clonedArr = cloneDeep(this.storeArr);

    this.store.dispatch(reduxActions.setClinicalSummary({ clinicalSummary: { diagnosticsInDTOs: clonedArr } }));
    this.clear();
  }

  onRowRemoved(e){
    this.storeArr = cloneDeep(this.gridData);
    this.storeArr = this.storeArr.map(element=> {
      const newElement = {
        ...element,
        Diagnostico: element.Diagnostico.idDTO,
        Programa: element.Programa ? element.Programa.idDTO : null,
        TipoDiagRegistroMedico: element.TipoDiagRegistroMedico.idDTO
      }
      return newElement;
    })
    this.store.dispatch(reduxActions.setClinicalSummary({ clinicalSummary: { diagnosticsInDTOs: this.storeArr } }));
  }
}