import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxCheckBoxComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { EgresoEnfermeriaDTO } from 'src/app/pages/infirmary-egress/models/EgresoEnfermeriaDTO';
import { SessionService } from 'src/app/services/session.service';
import { StylingService } from 'src/app/services/styling.service';
import { GeneralFunctions } from 'src/app/utils/general-functions';
import { isThisTypeNode } from 'typescript';
import { CondicionEgresoEnfermeriaDTO } from '../../models/CondicionEgresoEnfermeriaDTO';
import { MedicinesByMedicalRecordDTO } from '../../models/MedicinesByMedicalRecordDTO';
import { OpcionDispositivoRetiradoEgresoEnfermeriaDTO } from '../../models/OpcionDispositivoRetiradoEgresoEnfermeriaDTO';
import { OpcionDispositivosEgresoEnfermeriaDTO } from '../../models/OpcionDispositivosEgresoEnfermeriaDTO';
import { OpcionEducacionEgresoEnfermeriaDTO } from '../../models/OpcionEducacionEgresoEnfermeriaDTO';
import { OpcionFormaEducacionEgresoEnfermeriaDTO } from '../../models/OpcionFormaEducacionEgresoEnfermeriaDTO';
import { OpcionMedioSalidaEgresoEnfermeriaDTO } from '../../models/OpcionMedioSalidaEgresoEnfermeriaDTO';
import { OrdenMedicaDTO } from '../../models/OrdenMedicaDTO';
import { EgressService } from '../../services/egress.service';

@Component({
  selector: 'oph-form-egress',
  templateUrl: './form-egress.component.html',
  styleUrls: ['./form-egress.component.scss']
})
export class FormEgressComponent implements OnInit {
  @ViewChild("formEgress") form: DxFormComponent;
  @ViewChildren("optionsEducation") checkBoxesList: QueryList<DxCheckBoxComponent>;

  condicionesEgreso:CondicionEgresoEnfermeriaDTO[];  
  devicesToRemove:OpcionDispositivoRetiradoEgresoEnfermeriaDTO[];
  devicesToEgress:OpcionDispositivosEgresoEnfermeriaDTO[];
  optionsEducationsForm:OpcionFormaEducacionEgresoEnfermeriaDTO[];
  optionsEducations:OpcionEducacionEgresoEnfermeriaDTO[];
  optionsExitMediums:OpcionMedioSalidaEgresoEnfermeriaDTO[];
  isLoading = false;
  disabledSave = true
  disabledGenerate = true;
  gridOrder:string;
  gridMedicines:string;
  egressRecord:EgresoEnfermeriaDTO = new EgresoEnfermeriaDTO();
  orders:Array<OrdenMedicaDTO>;
  medicines:Array<MedicinesByMedicalRecordDTO>

  constructor(
    private _sessionService: SessionService,
    private _stylingService: StylingService,
    private _generalFunctions: GeneralFunctions,
    private _egressServices:EgressService,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getParameter();
    this.initVariables();
    this.GetEducationForm();
    this.GetEducationsCares();    
    this.GetExitMediumEgress();
    this.getCondicionesEgreso();  
    this.GetEgressWithInvasiveDevices();    
    this.GetOptionsDevicesRetiredEgressInfirmary();
    this.getSpecialistInformation()
  }

  getParameter(){
    this._activateRoute.queryParams.subscribe(params => {
      const medicalRecord = params['medicalrecord'];
      if (!medicalRecord) {
        notify("No existe un registro médico ","error")
        return
      }
      this.egressRecord.registroMedico=medicalRecord;
      this.GetMedicalOrdersByRecordMedical(medicalRecord);
      this.GetMedicinesByMedicalRecord(medicalRecord);
    });
  }

  initVariables(){
    this.gridOrder=this._generalFunctions.generateGuid();
    this.gridMedicines=this._generalFunctions.generateGuid();
  }
  
  GetMedicalOrdersByRecordMedical(idMedicalRecord:string){
    this._egressServices
    .GetMedicalOrdersByRecordMedical(idMedicalRecord)
    .subscribe((response) => {
      if (response !== undefined) {
        this.orders=response;
        console.log(this.orders);
       // this.egressRecord.personalAsistenciaRegistra=response.idDTO;
      }
    });
  }
  GetMedicinesByMedicalRecord(idMedicalRecord:string){
    this._egressServices
    .GetMedicinesByMedicalRecord(idMedicalRecord)
    .subscribe((response) => {
      if (response !== undefined) {
        this.medicines=response;
        console.log('###################################################')
        console.log(this.medicines);      
      }
    });
  }

  getSpecialistInformation(){
    this._egressServices
    .getCareStaff(
      this._sessionService.session !== null
        ? this._sessionService.session.accountCode
        : "JOSECP"
    )
    .subscribe((response) => {
      if (response !== undefined) {       
        this.egressRecord.personalAsistenciaRegistra=response.idDTO;
      }
    });
  }

  getCondicionesEgreso(){
    this._egressServices.getCondicionesEgreso().subscribe((res: any) => {  
      this.condicionesEgreso = res;   
    });
  }

  GetOptionsDevicesRetiredEgressInfirmary(){
    this._egressServices.GetOptionsDevicesRetiredEgressInfirmary().subscribe((res: any) => {  
     this.devicesToRemove = res; 
    });
  }

  GetEgressWithInvasiveDevices(){
    this._egressServices.GetEgressWithInvasiveDevices().subscribe((res: any) => {  
     this.devicesToEgress = res;    
    });
  }

  GetEducationsCares(){
    this._egressServices.GetEducationsCares().subscribe((res: any) => {  
     this.optionsEducations = res;     
    });
  }

  GetEducationForm(){
    this._egressServices.GetEducationForm().subscribe((res: any) => {  
     this.optionsEducationsForm = res;     
    });
  }

  GetExitMediumEgress(){
    this._egressServices.GetExitMediumEgress().subscribe((res: any) => {  
     this.optionsExitMediums = res;  
    });
  }

  onContentReady(e: any) {
    if (this._sessionService.session) {
      setTimeout(() => {
        const gridEl = document.getElementById(this.gridOrder);
        if (gridEl && this._sessionService.session.selectedCompany.theme !== null) {
          this._stylingService.setGridHeaderColorStyle(gridEl, this._sessionService.session.selectedCompany.theme);
          this._stylingService.setGridHeaderTextColorStyle(gridEl, this._sessionService.session.selectedCompany.theme);}

          const gridM = document.getElementById(this.gridMedicines);
        if (gridM && this._sessionService.session.selectedCompany.theme !== null) {
          this._stylingService.setGridHeaderColorStyle(gridM, this._sessionService.session.selectedCompany.theme);
          this._stylingService.setGridHeaderTextColorStyle(gridM, this._sessionService.session.selectedCompany.theme);
        }
      }, 1);
    }
  }

  onCheckValueChanged(value, id, descripcion){
    const formaExists = this.egressRecord.forma.findIndex(f => f.id === id);
    if(value && formaExists === -1){
      this.egressRecord.forma.push({
        id: id,
        descripcion: descripcion
      })
    } else {
      this.egressRecord.forma.splice(formaExists, 1)
    }
  }

  onSave() {    
    this.isLoading = true;   
    if (this.form.instance.validate().isValid){
      console.log(this.egressRecord);
      this._egressServices.SaveEgress(this.egressRecord).subscribe(res => {
      this.disabledGenerate=false;
        console.log(res);
        this.form.instance.resetValues();        
        this.checkBoxesList.forEach(x => x.value = false);
        this.isLoading = false
        notify("El egreso de enfermeria ha sido registrado"); 
      })      
    }else{
      this.isLoading = false
    }      
  }

  onGenerateReport(){

  }

}
